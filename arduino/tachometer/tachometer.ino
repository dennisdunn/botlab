#include <MsTimer2.h>
#include "tachometer.h"

char buffer[STR_BUF];
int conversion_factor = 1;

volatile int pulse_count[2][2];
volatile boolean has_data = false;

void setup()
{
  Serial.begin(115200);

  pinMode(IRQ_0_PIN, INPUT_PULLUP);
  pinMode(IRQ_1_PIN, INPUT_PULLUP);

  attachInterrupt(IRQ_0, tach_0_isr, FALLING);
  attachInterrupt(IRQ_1, tach_1_isr, FALLING);

  MsTimer2::set(1000/HZ, timer_isr);
  MsTimer2::start();
}

void loop()
{
  if(has_data)
  {
    send(pulse_count[IRQ_0][1], pulse_count[IRQ_1][1]);
    has_data = false;

    digitalWrite(LED, !digitalRead(LED));
  }
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
  pulse_count[IRQ_0][1] =  pulse_count[IRQ_0][0];
  pulse_count[IRQ_1][1] =  pulse_count[IRQ_1][0];
  pulse_count[IRQ_0][0] = 0;
  pulse_count[IRQ_1][0] = 0;
  has_data = true;
}

void tach_0_isr()
{
  pulse_count[IRQ_0][0]++;
}

void tach_1_isr()
{
  pulse_count[IRQ_1][0]++;
}
