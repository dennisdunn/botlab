
import pigpio

pi = pigpio.pi()

class Motor:
    def __init__(self, gpio_cw, gpio_ccw):
        self.__gpio_cw = gpio_cw
        self.__gpio_ccw = gpio_ccw

    def cw(self, speed):
        pi.set_PWM_dutycycle(self.__gpio_cw, speed)
        pi.set_PWM_dutycycle(self.__gpio_ccw, 0)

    def ccw(self, speed):
        pi.set_PWM_dutycycle(self.__gpio_cw, 0)
        pi.set_PWM_dutycycle(self.__gpio_ccw, speed)

class Led:
    def __init__(self, gpio):
        self.__gpio = gpio

    def on(self):
        pi.write(self.__gpio, 1)

    def off(self):
        pi.write(self.__gpio, 0)

class InputPin:
    def __init__(self, gpio):
        self.__gpio = gpio

    def read(self):
        return pi.read(self.__gpio)

    def onHandler(self, fn):
        self.__handler = pi.callback(self.__gpio, pigpio.EITHER_EDGE, fn)

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
