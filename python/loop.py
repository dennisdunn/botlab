import threading

class loop(threading.Thread):
    def __init__(self, motor, encoder, pid):
        threading.Thread.__init__(self)

        self._encoder = encoder
        self._motor = motor
        self._pid = pid

        self.sp = 0
        self.pv = 0

        self._stop_requested = threading.Event()
        self.setDaemon(True)

    def __enter__(self):
        pass
    
    def __exit__(self, exec_type, exec_value, traceback):
        self.cancel()

    def run(self):
        while not self._stop_requested.is_set():
            self.pv = self._encoder.RPM()
            self.sig = self._pid.calculate(self.pv)
            self.err = self._pid._error
            self._motor.adjust_power(self.sig)

    def cancel(self):
        self._stop_requested.set()
        self._motor.stop()
        self._encoder.cancel()

if __name__ == "__main__":

    from read_RPM import reader
    from motor import motor
    from pid import pid
    import threading
    import pigpio
    import time

    pulse_per_revolution = 20
    reader_gpio = 24
    fwd_gpio = 19
    rev_gpio = 20
    weight = 0.5

    pi = pigpio.pi()

    reader = reader(pi, reader_gpio, pulse_per_revolution, weight)
    motor = motor(pi, fwd_gpio, rev_gpio)
    pid = pid()
    pid.setpoint = 150

    loop = loop(motor, reader, pid)

    RUN_TIME = 30.0
    SAMPLE_TIME = 2.0

    loop.start()

    start = time.time()

    while (time.time() - start) < RUN_TIME:

        time.sleep(SAMPLE_TIME)

        print("RPM={}\tdelta={1}\terr={2}".format(int(loop.pv+0.5), int(loop.sig+0.5),int(loop.err+0.5)))

    loop.cancel()
