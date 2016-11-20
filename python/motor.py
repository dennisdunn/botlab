
import pigpio

class motor:
    def __init__(self, pi, gpio_fwd, gpio_rev):
        self._gpio_fwd = gpio_fwd
        self._gpio_rev = gpio_rev
        self._gpio_current = gpio_fwd
        self.direction = "fwd"
        self.power = 0

    def __enter__(self):
        pass

    def __exit__(self, exec_type, exec_value, traceback):
        self.reset()

    def stop(self):
        self.set_power(0)
        self.set_direction("fwd")

    def adjust_power(self, delta):
        power = self.power + delta
        self.set_power(power)

    def set_power(self, power):
        power = int(power)
        power = 0 if power < 0 else 255 if power > 255 else power
        self.power = power
        pi.set_PWM_dutycycle(self._gpio_current, power)

    def set_direction(self, direction):
        power = self.power
        self.set_power(0)
        self.direction = direction
        if direction == "fwd":
            self._gpio_current = self._gpio_fwd
        else:
            self._gpio_current = self._gpio_rev
        self.set_power(power)
