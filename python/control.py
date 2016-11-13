import threading
from encoder import RotaryEncoder
from pid import Pid
from motor import Motor

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
            print("proc={0}\tsig={1}", self._pid.process_variable, self._pid.control_signal)
        self._encoder.stop()
        self._motor.reset()

    def stop(self):
        self._stop_requested.set()

    def set_setpoint(self, setpoint):
        print("setpoint={0}".format(setpoint))
        self._pid.setpoint = setpoint
