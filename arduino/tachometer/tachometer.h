#ifndef TACHOMETER.H
#define TACHOMETER .H

#define IRQ_0_PIN 2
#define IRQ_1_PIN 3
#define BUF_LEN 7
#define LED 13
#define HZ 10

#define IRQ_0 (IRQ_0_PIN - 2)
#define IRQ_1 (IRQ_1_PIN - 2)

void timer_isr();
void tach_0_isr();
void tach_1_isr();
void send(int x, int y);

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

#endif
