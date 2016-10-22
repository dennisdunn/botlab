
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
    __power = 0
    __minPower = 0
    __maxPower = 255
    __direction = "fwd"

    @staticmethod
    def stop():
        Motors.setPower(0)

    @staticmethod
    def forward(delta):
        delta = int(delta)
        Motors.setDirection("fwd")
        Motors.setPower(Motors.__minPower + delta)

    @staticmethod
    def reverse(delta):
        delta = int(delta)
        Motors.setDirection("rev")
        Motors.setPower(Motors.__minPower + delta)

    @staticmethod
    def left(rate):
        rate = int(rate)
        turn_speed = Motors.__power - rate
        Motors.__motor_a.setPower(turn_speed)
        Motors.__motor_b.setPower(Motors.__power)   

    @staticmethod
    def right(rate):
        rate = int(rate)
        turn_speed = Motors.getPower() - rate 
        Motors.__motor_a.setPower(Motors.__power)        
        Motors.__motor_b.setPower(turn_speed)

    @staticmethod
    def setPower(power):
        power = int(power)
        Motors.__power = power
        Motors.__motor_a.setPower(power)
        Motors.__motor_b.setPower(power)

    @staticmethod
    def setMinPower(power):
        power = int(power)
        Motors.__minPower = power

    @staticmethod
    def setMaxPower(power):
        power = int(power)
        Motors.__maxPower = power

    @staticmethod
    def setDirection(direction):
        Motors.__direction = direction
        if direction == "fwd":
            Motors.__motor_a.setDirection("cw")
            Motors.__motor_b.setDirection("cw")
        else:
            Motors.__motor_a.setDirection("ccw")
            Motors.__motor_b.setDirection("ccw")

    @staticmethod    
    def getPower():
        return int(Motors.__power)
        
    @staticmethod    
    def getMinPower():
        return int(Motors.__minPower)
        
    @staticmethod    
    def getMaxPower():
        return int(Motors.__maxPower)

    @staticmethod
    def getDirection():
        return Motors.__direction

