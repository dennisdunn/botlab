
class Pid:
    
    def __init__(self, callback):
        self._error = 0
        self._diff = 0
        self._integral = 0
        self._prev_error = 0
        self._callback = callback
        self.setpoint = 0
        self.control_signal = 0
        self.process_variable = 0
        self.kp= 1
        self.kd = 0 
        self.ki = 0

    def calculate(self, process_variable):
        self._error = self.setpoint - process_variable
        self._diff = self._prev_error - self._error
        self._prev_error = self._error
        self._integral = self._integral + self._error
        
        self.process_variable = process_variable
        self.control_signal += self.kp * self._error + self.kd * self._diff + self.ki * self._integral
        
        self._callback(self.control_signal)
    
