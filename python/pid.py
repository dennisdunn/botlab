
class Pid:
    
    def __init__(self, callback):
        self._error = 0
        self._diff = 0
        self._integral = 0
        self._prev_error = 0
        self._callback = callback
        self.setpoint = 0
        self.control_signal = 0
        self.kp= 1
        self.kd = 0 
        self.ki = 0

    def calculate(self, processVariable):
        self._error = self.setpoint - processVariable
        self._diff = self._prevError - self._error
        self._prevError = self._error
        self._integral = self._integral + self._error
        self.controlSignal += self.kp * self._error + self.kd * self._diff + self.ki * self._integral
        print("signal={0}".format(self.control_signal))
        self._callback(self.control_signal)
    
