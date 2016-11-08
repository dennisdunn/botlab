
import pigpio

pi = pigpio.pi()

class Motor:
    def __init__(self, gpio_cw, gpio_ccw):
        self._gpio_cw = gpio_cw
        self._gpio_ccw = gpio_ccw
        self._gpio_current = gpio_cw
        self.power = 0
        self.direction = "cw"

    def reset(self):
        self.setPower(0)
        self.setDirection("cw")

    def setPower(self, power):
        power = int(power)
        power = 0 if power < 0 else 255 if power > 255 else power
        self.power = power
        pi.set_PWM_dutycycle(self._gpio_current, power)

    def setDirection(self, direction):
        power = self.power
        self.setPower(0)
        self.direction = direction
        if direction == "cw":
            self._gpio_current = self._gpio_cw
        else:
            self._gpio_current = self._gpio_ccw
        self.setPower(power)
