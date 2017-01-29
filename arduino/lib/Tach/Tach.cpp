#include "Arduino.h"
#include "Tach.h"

#define IRQ_PER_REVOLUTION 20

Tach::Tach(int pin, void (*dispatcher)(void))
{
    attachInterrupt(pin - 2, dispatcher, RISING);
    _n = 0;
    _then = 0;
}

void Tach::handler()
{
    _n++;
}

int Tach::get_rpm()
{
    int rpm;
    long now;

    cli();
    now = millis();
    rpm = (_n * 3000)/(now - _then);
    _n = 0;
    _then = now;
    sei();

    return rpm;
}

