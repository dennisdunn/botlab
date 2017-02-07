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
int cmp(const void *arg1, const void *arg2);

#endif
