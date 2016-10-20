
import hardware as pi

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

class Motors:
    __motor_a = pi.Motor(19, 20)
    __motor_b = pi.Motor(21, 26)
    Motors.setDirection("fwd")
    Motors.setSpeed(0)

    @staticmethod
    def stop():
        __speed = 0
        Motors.__motor_a.setSpeed(0)
        Motors.__motor_b.setSpeed(0)

    @staticmethod
    def forward(speed):
        Motors.setDirection("fwd")
        Motors.setSpeed(speed)

    @staticmethod
    def reverse(speed):
        Motors.setDirection("rev")
        Motors.setSpeed(speed)

    @staticmethod
    def left(rate):
        Motors.__motor_b.setSpeed(Motors.getSpeed() - rate)

    @staticmethod
    def right(rate):
        Motors.__motor_a.setSpeed(Motors.getSpeed() - rate)

    @staticmethod
    def setSpeed(self, speed):
        Motors.__speed=speed
        Motors.__motor_a.setSpeed(speed)
        Motors.__motor_b.setSpeed(speed)

    @staticmethod
    def setDirection(self,direction):
         Motors.__direction=direction
         if direction == "fwd":
            Motors.__motor_a.setDirection("cw")
            Motors.__motor_b.setDirection("cw")
        else:
            Motors.__motor_a.setDirection("ccw")
            Motors.__motor_b.setDirection("ccw")

    @staticmethod    
    def getSpeed(self):
        return Motors.__speed

    @staticmethod
    def getDirection(self):
        return Motors.__direction

