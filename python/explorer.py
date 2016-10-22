
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
    __direction = "fwd"
    MaxPower = 255

    @staticmethod
    def stop():
        Motors.setPower(0)

    @staticmethod
    def forward(power):
        Motors.setDirection("fwd")
        Motors.setPower(power)

    @staticmethod
    def reverse(power):
        Motors.setDirection("rev")
        Motors.setPower(power)

    @staticmethod
    def left(rate):
        rate = int(rate)
        turn_speed = Motors.getPower() - rate
        turn_speed = 0 if turn_speed < 0 else Motors.MaxPower if turn_speed > Motors.MaxPower else turn_speed
        Motors.__motor_a.setPower(turn_speed)
        Motors.__motor_b.setPower(Motors.getPower())   

    @staticmethod
    def right(rate):
        rate = int(rate)
        turn_speed = Motors.getPower() - rate        
        turn_speed = 0 if turn_speed < 0 else Motors.MaxPower if turn_speed > Motors.MaxPower else turn_speed
        Motors.__motor_a.setPower(Motors.getPower())        
        Motors.__motor_b.setPower(turn_speed)

    @staticmethod
    def setPower(power):
        power = int(power)
        power = 0 if power < 0 else Motors.MaxPower if power > Motors.MaxPower else power
        Motors.__power = power
        Motors.__motor_a.setPower(power)
        Motors.__motor_b.setPower(power)

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
    def getDirection():
        return Motors.__direction

