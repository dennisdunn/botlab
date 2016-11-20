
class pid:

    def __init__(self):
        self._diff = 0
        self._error = 0
        self._integral = 0
        self._prev_error = 0

        self.setpoint = 0
        self.kp = 1 
        self.ki = 0
        self.kd = 0

    def calculate(self, process_variable):
        self._error = self.setpoint - process_variable
        self._diff = self._prev_error - self._error
        self._prev_error = self._error
        self._integral = self._integral + self._error

        return self.kp * self._error + self.ki * self._integral + self.kd * self._diff

