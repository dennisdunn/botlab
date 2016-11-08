
import pigpio

pi = pigpio.pi()

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

    def set(self):
        pi.write(self.__gpio, 1)

    def clear(self):
        pi.write(self.__gpio, 0)

class Light:
    Blue = pi.Led(4)
    Yellow = pi.Led(17)
    Red = pi.Led(27)
    Green = pi.Led(5)
    
class Input:
    One = pi.InputPin(23)
    Two = pi.InputPin(22)
    Three = pi.InputPin(24)
    Four = pi.InputPin(25)

class Output:
    One = pi.OutputPin(6)
    Two = pi.OutputPin(12)
    Three = pi.OutputPin(13)
    Four = pi.OutputPin(16)
