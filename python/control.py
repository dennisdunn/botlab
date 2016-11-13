import sys
import threading
from pid import Pid
from motor import Motor
from encoder import RotaryEncoder

class ControlLoop(threading.Thread):
    def __init__(self, period, signal, fwd, rev):
        threading.Thread.__init__(self)
        self._motor = Motor(fwd, rev)
        self._pid = Pid(self._motor.set_power)
        self._encoder = RotaryEncoder(signal, period, self._pid.calculate)
        self._stop_requested = threading.Event()
        self.setDaemon(True)
    
    def run(self):
        self._encoder.start()
        while not self._stop_requested.is_set():
            pass
        self._pid.enable = False
        self._encoder.stop()
        self._motor.reset()

    def stop(self):
        self._stop_requested.set()

    def set_setpoint(self, setpoint):
        self._pid.setpoint = setpoint
