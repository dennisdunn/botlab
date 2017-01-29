#include "Arduino.h"
#include "Tach.h"

#define IRQ_PER_REVOLUTION 20

Tach::Tach(int pin, void (*dispatcher)(void))
{
    attachInterrupt(pin - 2, dispatcher, RISING);
    _n = 0;
    _t = 0;
    _rpm = 0;
}

void Tach::handler()
{
    int t = 0;
    _n++;

    if(_n >= 20)
    {
        t = millis();
        _rpms = (_n * 3000)/(t - _t);
        _n = 0;
        _t = t;
    }
}

int Tach::get_rpm()
{
    return _rpm;
}

