#include <MsTimer2.h>
#include "tachometer.h"

float conversion_factor = 1.0;

volatile bool has_data = false;
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
  if (has_data)
  {
    int tach_0[BUF_LEN];
    int tach_1[BUF_LEN];

    cli();
    for (int i = 0; i < BUF_LEN; i++)
    {
      tach_0[i] = ring_buffer[IRQ_0][i];
      tach_1[i] = ring_buffer[IRQ_1][i];
    }
    sei();

    qsort(tach_0, BUF_LEN, sizeof(int), cmp<int>);
    qsort(tach_1, BUF_LEN, sizeof(int), cmp<int>);

    // report the median
    send(tach_0[BUF_LEN / 2], tach_1[BUF_LEN / 2]);

    digitalWrite(LED, !digitalRead(LED));
    has_data = false;
  }
}

void send(int x, int y)
{
  char buffer[STR_LEN];
  sprintf(buffer, "[%i,%i]", x, y);
  Serial.println(buffer);
}

void timer_isr()
{
  static int idx = 0;

  ring_buffer[IRQ_0][idx] = pulse_count[IRQ_0];
  ring_buffer[IRQ_1][idx] = pulse_count[IRQ_1];

  pulse_count[IRQ_0] = 0;
  pulse_count[IRQ_1] = 0;

  if (++idx == BUF_LEN)
    idx = 0;

  has_data = true;
}

void tach_0_isr()
{
  pulse_count[IRQ_0]++;
}

void tach_1_isr()
{
  pulse_count[IRQ_1]++;
}
