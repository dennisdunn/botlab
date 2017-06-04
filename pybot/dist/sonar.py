#!/usr/bin/env python3

# Constantly ping and when collision is immenent,
# take control to avoid the obstacle.

# sonar.ECHO = 23
# sonar.TRIG = 6
# sonar.threshold = 5 # cm
# sonar.q = Queue()

import multiprocessing as mp
import explorerhat as hw
# import RPi.GPIO as GPIO
import time

class Sonar:

    def ping(self):
#        GPIO.output(self.TRIG, False)
        hw.output.one.off()
        time.sleep(.001)

#        GPIO.output(self.TRIG, True)
        hw.output.one.on()
        time.sleep(0.00001)
#        GPIO.output(self.TRIG, False)
        hw.output.one.off()

#        while GPIO.input(self.ECHO)==0:
        while hw.input.one.read() == 0:
            pulse_start = time.time()

#        while GPIO.input(self.ECHO)==1:
        while hw.input.one.read() == 1:
            pulse_end = time.time()

        pulse_duration = pulse_end - pulse_start
        distance = pulse_duration * 17150
        distance = round(distance, 2)
        return distance

if __name__ == "__main__":
    app = Sonar()
    while True:
        distance = app.ping()
        print ("{0} cm".format(distance))
        time.sleep(1)
