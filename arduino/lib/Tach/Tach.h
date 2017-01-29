#ifndef TACH_h
#define TACH_h

#include "Arduino.h"

class Tach
{
    public:
        Tach(int pin, void(*dispatcher)(void));
        void handler();
        int get_rpm();
    private:
        volatile unsigned long _t;
        volatile int _rpm;
        volatile int _n;
};


#endif
