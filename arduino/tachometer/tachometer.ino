#include <MsTimer2.h>
#include "tachometer.h"

float conversion_factor = 1.0;

volatile int pulse_count[2];
volatile int ring_buffer[2][BUF_LEN];

void setup()
{
  memset(pulse_count, 0, sizeof(pulse_count));
  memset(ring_buffer, 0, sizeof(ring_buffer));

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
  send(pulse_count[IRQ_0], pulse_count[IRQ_1]);
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
  idx = idx++ % BUF_LEN;

  ring_buffer[IRQ_0][idx] = pulse_count[IRQ_0];
  ring_buffer[IRQ_1][idx] = pulse_count[IRQ_1];

  memset(pulse_count, 0, sizeof(pulse_count));
}

void tach_0_isr()
{
  pulse_count[IRQ_0]++;
}

void tach_1_isr()
{
  pulse_count[IRQ_1]++;
}
