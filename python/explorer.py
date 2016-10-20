
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
    __running = False

    @staticmethod
    def stop():
        Motors.__motor_a.cw(0)
        Motors.__motor_a.cw(0)
        Motors.__motor_b.ccw(0)
        Motors.__motor_b.ccw(0)
        Motors.__running = False

    @staticmethod
    def forward(speed):
        if Motors.__running:
            Motors.stop()
        Motors.__motor_a.cw(speed)
        Motors.__motor_b.cw(speed)
        Motors.__running = True

    @staticmethod
    def reverse(speed):
        if Motors.__running:
            Motors.stop()
        Motors.__motor_a.ccw(speed)
        Motors.__motor_b.ccw(speed)
        Motors.__running = True

    @staticmethod
    def left(offset):
        Motors.__motor_b.delta(offset)

    @staticmethod
    def right(offset):
        Motors.__motor_a.delta(offset)

