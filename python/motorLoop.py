import threading
from encoder import RotaryEncoder
from pid import Pid
from motor import Motor

class MotorControlLoop(threading.Thread):
    def __init__(self, signal, cw, ccw):
        threading.Thread.__init__(self)
        self.__motor = Motor(cw,ccw)
        self.__pid = Pid(self.__motor.setPower)
        self.__encoder = RotaryEncoder(signal, self.__pid.calculate)
        self.__stopRequested = False
        self.setDaemon(True)
    
    def __del__(self):
        self.__encoder.stop()

    def run(self):
        self.__encoder.start()
        while not self.__stopRequested:
            pass
        self.__encoder.stop()
        self.__motor.reset()

    def stop(self):
        self.__stopRequested = True

    def setTarget(self, setpoint):
        print("setpoint={0}".format(setpoint))
        self.__pid.setpoint = setpoint
