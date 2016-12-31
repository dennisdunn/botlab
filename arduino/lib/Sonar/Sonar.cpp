#include "Arduino.h"
#include <NewPing.h>
#include "Sonar.h"

#define INVALID_DATA -1
#define MEDIAN 3

Sonar::Sonar(int pin, int max_distance)
{
    _sensor = NewPing::NewPing(pin, pin, max_distance);
};

int Sonar::get_range()
{
    int echo = _sensor.ping_median(MEDIAN);
    int range = _sensor.convert_cm(echo);
    return range > 0 ? range : INVALID_DATA;
};
