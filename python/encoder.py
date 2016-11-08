import pigpio
import threading
    
pi = pigpio.pi()

class RotaryEncoder(threading.Thread):
    def __init__(self, signal, period, callback):
        threading.Thread.__init__(self)
        self._gpio = signal
        self._stop_requested = Event()
        self._period = period
        self._callback = callback
        self.setDaemon()
        
    def _timerHandler(self):
        count = self._sensor_handler.tally()
        self._sensor_handler.reset_tally()
        print("count={0}".format(count))
        self._callback(count)

    def run(self):
        self._sensor_handler = pi.callback(self.__gpio)
        while not self._stop_requested.is_set():
            self._thread = threading.Timer(self._period, self._timer_handler)
            self._thread.start()
        self._sensor_handler.cancel()

    def stop(self):        
        self._stop_requested.set()
