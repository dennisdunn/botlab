import pigpio
import threading
    
pi = pigpio.pi()

class RotaryEncoder:
    def __init__(self, signal, callback):
        self.__gpio =sig # signal
        self.period = 0.1 # 100 ms
        self.onTrigger = callback
        
    def __del__(self):
        self.stop():

    def __timerHandler(self):
        count = self.__sensorHandler.tally()
        self.__sensorHandler.reset_tally()
        if hasattr(self, '__onTrigger'):
            self.onTrigger(count)

    def start(self):
        self.__sensorHandler = pi.callback(self.__gpio)
        self.__timer = threading.Timer(self.period, self.__timerHandler)
        self.__timer.start()

    def stop(self):        
        self.__timer.stop():
        self.__sensorHandler.cancel()