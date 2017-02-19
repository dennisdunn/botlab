#ifndef TACH_h
#define TACH_h

#include "Arduino.h"

class Tach
{
  public:
    Tach(int pin, void (*dispatcher)(void));
    void isr();
    unsigned int get_rpm();

  private:
    volatile unsigned long _then;
    volatile unsigned int _n;
    int _irq;
};

#endif
