import pigpio
import threading
    
pi = pigpio.pi()

class RotaryEncoder:
    def __init__(self, signal, callback):
        self.__gpio = signal
        self.__stopRequested = False
        self.period = 0.1 # 100 ms
        self.onTrigger = callback
        
    def __del__(self):
        self.stop()

    def __timerHandler(self):
        count = self.__sensorHandler.tally()
        print("count={0}".format(count))
        self.__sensorHandler.reset_tally()
        if hasattr(self, 'onTrigger'):
            self.onTrigger(count)

    def start(self):
        self.__sensorHandler = pi.callback(self.__gpio)
        while not self.__stopRequested:
            threading.Timer(self.period, self.__timerHandler).start()
        self.__sensorHandler.cancel()

    def stop(self):        
        self.__stopRequested = True
