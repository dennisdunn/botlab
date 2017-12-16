
class Motor:
    def __init__(self, pi, gpio_fwd, gpio_rev):
        self._pi = pi
        self._gpio_fwd = gpio_fwd
        self._gpio_rev = gpio_rev
        self._gpio_current = gpio_fwd
        self._direction = "fwd"
        self._power = 0

    def __enter__(self):
        pass

    def __exit__(self, exec_type, exec_value, traceback):
        pass

    def stop(self):
        self.set_power(0)
        self.set_direction("fwd")

    def adjust_power(self, delta):
        power = self._power + delta
        self.set_power(power)

    def set_power(self, power):
        power = int(power)
        power = 0 if power < 0 else 255 if power > 255 else power
        self._power = power
        self._pi.set_PWM_dutycycle(self._gpio_current, power)

    def get_power(self):
        return self._power

    def set_direction(self, direction):
        power = self._power
        self.set_power(0)
        self._direction = direction
        if direction == "fwd":
            self._gpio_current = self._gpio_fwd
        else:
            self._gpio_current = self._gpio_rev
        self.set_power(power)

    def get_direction(self):
        return self._direction

if __name__ == "__main__":
    import pigpio
    from time import sleep

    pi = pigpio.pi()
    motor = Motor(pi, 21, 26)
    motor.set_power(255)
    sleep(1)
    motor.set_direction("rev")
    sleep(1)
    motor.stop()
    pi.stop()
