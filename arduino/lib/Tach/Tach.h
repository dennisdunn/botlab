#ifndef TACH_h
#define TACH_h

#include "Arduino.h"

class Tach
{
    public:
        Tach(int pin);
        int get_rpm();
    private:
        int _t;
        int _n;
        void _ISR();
        void _reset();
};


#endif
