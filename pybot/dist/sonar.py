#!/usr/bin/env python3

# Constantly ping and when collision is immenent,
# take control to avoid the obstacle.

# sonar.ECHO = 23
# sonar.TRIG = 6
# sonar.threshold = 5 # cm
# sonar.q = Queue()

import multiprocessing as mp
import explorerhat as hw
import RPi.GPIO as GPIO
import time

class Sonar:

    def __init__(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.ECHO,GPIO.IN)
        GPIO.setup(self.TRIG,GPIO.OUT)
    
    def ping(self):
        GPIO.output(TRIG, False)
        time.sleep(.001)

        GPIO.output(TRIG, True)
        time.sleep(0.00001)
        GPIO.output(TRIG, False)

        while GPIO.input(ECHO)==0:
        pulse_start = time.time()

        while GPIO.input(ECHO)==1:
        pulse_end = time.time()

        pulse_duration = pulse_end - pulse_start
        distance = pulse_duration * 17150
        distance = round(distance, 2)
        return distance

if __name__ == "__main__":
    app = Sonar()
    app.ECHO = 23
    app.TRIG = 6
    while:
        distance = app.ping()
        print distance, " cm"
        time.sleep(1)