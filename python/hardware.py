
import pigpio

pi = pigpio.pi()

class Motor:
    def __init__(self, gpio_cw, gpio_ccw):
        self.__gpio_cw = gpio_cw
        self.__gpio_ccw = gpio_ccw
        self.__gpio_current = gpio_cw
        self.__power = 0
        self.__direction = "cw"

    def reset(self):
        self.setPower(0)
        self.setDirection("cw")

    def setPower(self, power):
        self.__power = int(power)
        pi.set_PWM_dutycycle(self.__gpio_current, power)

    def setDirection(self, direction):
        self.setPower(0)
        self.__direction = direction
        if direction == "cw":
            self.__gpio_current = self.__gpio_cw
        else:
            self.__gpio_current = self.__gpio_ccw
        self.setPower(self.__power)

    def getPower(self):
        return self.__power

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
