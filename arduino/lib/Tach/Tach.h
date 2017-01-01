#ifndef TACH_h
#define TACH_h

#include "Arduino.h"

class Tach
{
    public:
        Tach(int pin);
        int get_rpm();
    private:
        int _prev_t;
}


#endif
