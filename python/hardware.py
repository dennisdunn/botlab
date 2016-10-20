
import pigpio

pi = pigpio.pi()

class Motor:
    def __init__(self, gpio_cw, gpio_ccw):
        self.__gpio_cw = gpio_cw
        self.__gpio_ccw = gpio_ccw
        self.__speed = 0
        self.__offset = 0
        self.__direction = "stop"

    def cw(self, speed):
        self.__speed = speed
        self.__offset = 0
        if speed == 0:
            self.__direction = "stop"
        else:
            self.__direction = "cw"
        pi.set_PWM_dutycycle(self.__gpio_cw, self.__speed)
        pi.set_PWM_dutycycle(self.__gpio_ccw, 0)

    def ccw(self, speed):
        self.__speed = speed
        self.__offset = 0
        if speed == 0:
            self.__direction = "stop"
        else:
            self.__direction = "ccw"
        pi.set_PWM_dutycycle(self.__gpio_cw, 0)
        pi.set_PWM_dutycycle(self.__gpio_ccw, self.__speed)

    def delta(offset):
        if self.__offset != offset:
            self.__offset = offset
            if self.__direction == "cw":
                pi.set_PWM_dutycycle(self.__gpio_cw, self.__speed - offset)
            elif self.__direction == "ccw":
                pi.set_PWM_dutycycle(self.__gpio_ccw, self.__speed - offset)

    def getSpeed(self):
        return self.__speed
        
    def getDirection(self):
        return self.__direction

class Led:
    def __init__(self, gpio):
        self.__gpio = gpio

    def on(self):
        pi.write(self.__gpio, 1)

    def off(self):
        pi.write(self.__gpio, 0)

    def status(self):
        return pi.read(self.__gpio)


class InputPin:
    def __init__(self, gpio):
        self.__gpio = gpio

    def read(self):
        return pi.read(self.__gpio)

    def onHandler(self, fn):
        self.__handler = pi.callback(self.__gpio, pigpio.RISING_EDGE, fn)

    def cancelHandler(self):
        if self.__handler:
            self.__handler.cancel()

class OutputPin:
    def __init__(self, gpio):
        self.__gpio = gpio

    def write(self, val):
        pi.write(self.__gpio, val)

    def set(self, val):
        pi.write(self.__gpio, 1)

    def clear(self, val):
        pi.write(self.__gpio, 0)
