#include "Arduino.h"
#include "Tach.h"

#define IRQ_PER_REVOLUTION 20

Tach::Tach(int pin, void(*dispatcher)(void))
{
    pinMode(pin, INPUT_PULLUP);
    attachInterrupt(pin - 2, dispatcher, RISING);
    _reset();
}

void Tach::handler()
{
    _n++;
}

int Tach::get_rpm()
{
    long t = millis() - _t;
    int n = _n;
    _reset();

    return n * 3000 / t;
}

void Tach::_reset()
{
    _n = 0;
    _t = millis();
}
