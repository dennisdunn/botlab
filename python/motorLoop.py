import threading
from encoder import RotaryEncoder
from pid import Pid
from motor import Motor

class MotorControlLoop(threading.Thread):
    def __init__(self, period, signal, cw, ccw):
        threading.Thread.__init__(self)
        self._motor = Motor(cw,ccw)
        self._pid = Pid(self.__motor.setPower)
        self._encoder = RotaryEncoder(signal, period, self._pid.calculate)
        self._stop_requested = Event()
        self.setDaemon(True)
    
    def run(self):
        self._encoder.start()
        while not self._stopRequested:
            pass
        self._encoder.stop()
        self._motor.reset()

    def stop(self):
        self._stopRequested = True

    def set_setpoint(self, setpoint):
        print("setpoint={0}".format(setpoint))
        self._pid.setpoint = setpoint
