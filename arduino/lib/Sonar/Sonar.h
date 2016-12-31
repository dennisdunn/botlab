#ifndef Sonar_h
#define Sonar_h

#include "Arduino.h"
#include <NewPing.h>

class Sonar {
    public:
        Sonar(int pin, int max_range);
        int get_range();
    private:
        NewPing _sensor;
};

#endif
