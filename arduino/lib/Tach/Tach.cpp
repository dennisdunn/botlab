#include "Arduino.h"
#include "Tach.h"

#define IRQ_PER_REVOLUTION 20

Tach::Tach(int pin, void (*dispatcher)(void))
{
    pinMode(pin, INPUT_PULLUP);
    attachInterrupt(pin - 2, dispatcher, FALLING);
    _reset();
}

void Tach::handler()
{
    _n++;
}

int Tach::get_rpm()
{
    noInterrupts();

    int n = _n;
    int t = (int)(millis() - _t);

    _reset();
    interrupts();
    return (n * 3000) / t;
}

void Tach::_reset()
{
    _n = 0;
    _t = millis();
}
