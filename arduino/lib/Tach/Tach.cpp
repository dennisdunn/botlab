#include "Arduino.h"
#include "Tach.h"

#define IRQ_PER_REVOLUTION 20

Tach::Tach(int pin) 
{
    pinMode(pin, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(pin), _ISR, RISING); 
}

void Tach::_ISR()
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