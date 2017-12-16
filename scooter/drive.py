from motor import Motor
from time import sleep

class Drive:

    def __init__(self, pi):
        self._pi = pi
        self._left = Motor(pi, 21, 26)
        self._right = Motor(pi, 20, 19)
        self._power = 0
        self._dir = "fwd"

    def power(self, level):
        self._power = level
        self._left.set_power(level)
        self._right.set_power(level)

    def stop(self):
        self._left.stop()
        self._right.stop()

    def turn(self, direction):
        if direction == "left":
            self._left.set_power(0)
        elif direction == "right":
            self._right.set_power(0)

    def left(self, duration):
        self.turn("left")
        sleep(duration)

    def right(self, duration):
        self.turn("right")
        sleep(duration)


    def forward(self):
        self._setDirection("fwd")

    def reverse(self):
        self._setDirection("rev")

    def _setDirection(self, direction):
        self._dir = direction
        self._left.set_direction(direction)
        self._right.set_direction(direction)
        self.power(self._power)


if __name__ == "__main__":
    import pigpio

    pi = pigpio.pi()
    drive = Drive(pi)
    print("set power")
    drive.power(255)
    sleep(1)
    print("turn left")
    drive.turn("left")
    sleep(1)
    drive.forward()
    sleep(1)
    print("turn right")
    drive.turn("right")
    sleep(1)
    drive.forward()
    sleep(1)
    print("stop")
    drive.stop()
    pi.stop()

