from control import ControlLoop

class Bot:
    def __init__(self):
        pass
       
    def start(self):        
        self._leftMotor = ControlLoop(1, 24, 19, 20)
        # self.__rightMotor = MotorControlLoop(1, 25, 21, 26)
        self._leftMotor.start()
        # self.__rightMotor.start()

    def stop(self):
        self._leftMotor.stop()
        # self._rightMotor.stop()

    def set_speed(self, target):
        self._leftMotor.setTarget(target)
        # self._rightMotor.setTarget(target)


b = Bot()
b.start()
b.set_speed(150)

