from motorLoop import MotorControlLoop

class Bot:
    def __init__(self):
        pass
       
    def start(self):        
        self.__leftMotor = MotorControlLoop(24, 19,20)
        # self.__rightMotor = MotorControlLoop(25, 21,26)
        self.__leftMotor.start()
        # self.__rightMotor.start()

    def stop(self):
        self.__leftMotor.stop()
        # self.__rightMotor.stop()

    def setSpeed(self, target):
        self.__leftMotor.setTarget(target)
        # self.__rightMotor.setTarget(target)
