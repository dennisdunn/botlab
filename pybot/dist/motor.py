import explorerhat
import time

class Motor:

    def __init__(self):
        self.speed = 0
        self.min = 50
        self.max = 100
        self.direction = 1 # 1 = forward, -1 = backwards

    def forward(self):
        self.direction = 1
        self.setPower()

    def reverse(self):
        self.direction = -1
        self.setPower()

    def stop(self):
        self.throttle(0)

    def throttle(self, speed=0):
        self.speed = speed
        self.setPower()

    def left(self, timeout=0):
        explorerhat.motor[1].speed(0)
        time.sleep(timeout)
        self.setPower()

    def right(self, timeout=0):
        explorerhat.motor[0].speed(0)
        time.sleep(timeout)
        self.setPower()

    def straight(self):
        self.setPower()

    def setPower(self):
        explorerhat.motor.speed(self.speed * self.direction)

