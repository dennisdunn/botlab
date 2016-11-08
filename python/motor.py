
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
        power = int(power)
        power = 0 if power < 0 else 255 if power > 255 else power
        self.__power = power
        pi.set_PWM_dutycycle(self.__gpio_current, power)

    def setDirection(self, direction):
        power = self.getPower()
        self.setPower(0)
        self.__direction = direction
        if direction == "cw":
            self.__gpio_current = self.__gpio_cw
        else:
            self.__gpio_current = self.__gpio_ccw
        self.setPower(power)

    def getPower(self):
        return self.__power

    def getDirection(self):
        return self.__direction
