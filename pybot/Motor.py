import explorerhat
import time

class Motor:

    def __init__(self):
        self.speed = 0
        self.min = 50
        self.max = 50
        self.direction = 1

    def forward(self,speed):
        self.direction = 1
        self.speed = speed
        self.setPower()

    def backward(self, speed):
        self.direction = -1
        self.speed = speed
        self.setPower()

    def stop(self):
        self.speed = 0
        self.direction = 1
        self.setPower()

    def left(self, seconds):
        explorerhat.motor[1].speed(0)
        time.sleep(seconds)
        self.setPower()

    def right(self, seconds):
        explorerhat.motor[0].speed(0)
        time.sleep(seconds)
        self.setPower()

    def setPower(self):
        explorerhat.motor.speed(self.speed * self.direction)

