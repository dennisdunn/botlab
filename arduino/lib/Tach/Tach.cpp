#include "Arduino.h"
#include "Tach.h"

#define IRQ_PER_REVOLUTION 20

Tach::Tach(int pin, void (*dispatcher)(void))
{
    _irq = digitalPinToInterrupt(pin);
    attachInterrupt(_irq, dispatcher, RISING);
    _n = 0;
    _then = millis();
}

void Tach::isr()
{
    _n++;
}

unsigned int Tach::get_rpm()
{
    unsigned int rpm;
    unsigned long now;

    detachInterrupt(_irq);
    now = millis();
    rpm = (_n * 3000) / (now - _then);
    _n = 0;
    _then = now;
    sei();

    return rpm;
}
