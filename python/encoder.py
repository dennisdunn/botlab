import pigpio
import threading
    
pi = pigpio.pi()

class RotaryEncoder(threading.Thread):
    def __init__(self, signal, period, callback):
        threading.Thread.__init__(self)
        self._gpio = signal
        self._stop_requested = threading.Event()
        self._period = period
        self._callback = callback
        self.setDaemon(True)
        
    def _timer_handler(self):
        count = self._sensor_handler.tally()
        self._sensor_handler.reset_tally()
        self._callback(count)

    def run(self):
        self._sensor_handler = pi.callback(self._gpio)
        while not self._stop_requested.is_set():
            self._thread = threading.Timer(self._period, self._timer_handler)
            self._thread.start()
        self._sensor_handler.cancel()

    def stop(self):        
        self._stop_requested.set()
