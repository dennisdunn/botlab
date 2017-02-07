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
  int tach_0 = 0;
  int tach_1 = 0;
  int counts[2][BUF_LEN];

  cli();
  memcpy(counts, ring_buffer, sizeof(ring_buffer));
  sei();

  qsort(ring_buffer[IRQ_0][0], BUF_LEN, sizeof(int), cmp<int>);
  qsort(ring_buffer[IRQ_1][0], BUF_LEN, sizeof(int), cmp<int>);

  // report the median
  send(counts[IRQ_0][BUF_LEN / 2], counts[IRQ_1][BUF_LEN / 2]);

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

// Sort
// http://arduino.stackexchange.com/questions/13255/do-i-need-a-bubble-sort-or-something-easier
template <typename T>
int cmp(const void *arg1, const void *arg2)
{
  T *a = (T *)arg1; // cast to pointers to type T
  T *b = (T *)arg2;
  // a less than b?
  if (*a < *b)
    return -1;
  // a greater than b?
  if (*a > *b)
    return 1;
  // must be equal
  return 0;
}

// ISR

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
