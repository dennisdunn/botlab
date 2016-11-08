
class Pid:
    
    def __init__(self, callback):
        self.__error = 0
        self.__diff = 0
        self.__integral = 0
        self.__prevError = 0
        self.__controlSignalCallback = callback
        self.setpoint = 0
        self.controlSignal = 0
        self.Kp = 1
        self.Kd = 0 
        self.Ki = 0

    def calculate(self, processVariable):
        self.__error = self.setpoint - processVariable
        self.__diff = self.__prevError - self.__error
        self.__prevError = self.__error
        self.__integral = self.__integral + self.__error
        self.controlSignal += self.Kp * self.__error + self.Kd * self.__diff + self.Ki * self.__integral
        print("signal={0}".format(self.controlSignal))
        self.__controlSignalCallback(self.controlSignal)
    
