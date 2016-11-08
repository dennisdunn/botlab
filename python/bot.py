from motorLoop import MotorControlLoop

class Bot:
    def __init__(self):
        pass
       
    def start(self):        
        self.__leftMotor = MotorControlLoop(24, 19,20)
        self.__leftMotor.start()

    def stop(self):
        self.__leftMotor.stop()

    def setSpeed(self, target):
        self.__leftMotor.setTarget(target)
