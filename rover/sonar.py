
class Sonar:

    def __init__(self, pi):
        self._pi = pi
        self._i2c = pi.i2c_open(1, 0x20)
        self._bearing = 1600
        self._pin = 18

    def ping(self):
        try:
            distance = self._pi.i2c_read_word_data(self._i2c, 0x01)
        except:
            distance = -1
        return distance

    def set_bearing(self, bearing = 1600):
        self._bearing = bearing
        self._pi.set_servo_pulsewidth(self._pin, self._bearing)

if __name__ == "__main__":
    import pigpio
    from time import sleep
        
    pi = pigpio.pi()
    sonar = Sonar(pi)
    bearing = 1600
    pause = 0.2
    delta = 150
    while True:
        sonar.set_bearing(bearing)
        print(bearing, sonar.ping())
        sleep(pause)
        delta = 150 if bearing <= 1200 else -150 if bearing >=2080 else delta
        bearing = bearing + delta
    pi.stop()

