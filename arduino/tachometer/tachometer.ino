#include <MsTimer2.h>
#include "tachometer.h"

float conversion_factor = 1.0;

volatile int pulse_count[2] = {0};
volatile int ring_buffer[2][BUF_LEN] = {0};

void setup()
{
  Serial.begin(115200);

  pinMode(IRQ_0_PIN, INPUT_PULLUP);
  pinMode(IRQ_1_PIN, INPUT_PULLUP);

  attachInterrupt(IRQ_0, tach_0_isr, FALLING);
  attachInterrupt(IRQ_1, tach_1_isr, FALLING);

  MsTimer2::set(1000 / HZ, timer_isr);
  MsTimer2::start();
}

void loop()
{
  int tach_0 = 0;
  int tach_1 = 0;
  int counts[2][BUF_LEN];

  cli();

  tach_0 = pulse_count[0];
  tach_1 = pulse_count[1];

  for(int i = 0; i < 2; i++)
  {
    for(int j = 0; j < BUF_LEN; j++)
    {
      counts[i][j] = ring_buffer[i][j];
    }
  }

  sei();

  qsort(counts[IRQ_0], BUF_LEN, sizeof(int), cmp<int>);
  qsort(counts[IRQ_1], BUF_LEN, sizeof(int), cmp<int>);

  // report the median
  // send(counts[IRQ_0][BUF_LEN / 2], counts[IRQ_1][BUF_LEN / 2]);
  send(tach_0, tach_1);

  digitalWrite(LED, !digitalRead(LED));
  delay(1000 / HZ);
}

void send(int x, int y)
{
  Serial.print("[");
  Serial.print(x);
  Serial.print(", ");
  Serial.print(y);
  Serial.print("]");
  Serial.println();
}

void timer_isr()
{
  static int idx = -1;
  idx = ++idx % BUF_LEN;

  for(int i =0;i < 2; i++)
  {
    ring_buffer[i][idx] = pulse_count[i];
  }

  for(int i =0; i < 2; i++)
  {
    pulse_count[i] = 0;
  }
}

void tach_0_isr()
{
  pulse_count[IRQ_0]++;
}

void tach_1_isr()
{
  pulse_count[IRQ_1]++;
}





