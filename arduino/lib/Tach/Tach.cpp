#include "Arduino.h"
#include "Tach.h"

#define IRQ_PER_REVOLUTION 20

Tach::Tach(int pin) 
{
    _prev_t = millis();
    attachInterrupt(pin, _handler, RISING);
}

Tach::_handler()
{
    _n++;
}

Tach::get_rpm()
{
    long t = millis() - _prev_t;
    int rpm = 0;

    _prev_t = millis();
    _n = 0;
    return rpm;
}
