#!/usr/bin/python
import signal
import sys
import pigpio
import explorerhat
from drive import Drive
from sonar import Sonar

class ScooterBot:

    def __init__(self):
        self._pi = pigpio.pi()

        self.drive = Drive(self._pi)
        self.drive.power(180)

        self.sonar = Sonar(self._pi)
        self.sonar.configure(0x01)
        self.sonar.bearing(1600)

        self.running = False

    def find_path(self):
        self.sonar.bearing(1200)
        r = bot.sonar.ping()
        self.sonar.bearing(2000)
        l = bot.sonar.ping()
        self.sonar.bearing(1600)
        if r > l:
            sonar.drive.left(2)
        else:
            sonar.drive.right(2)

    def start(self):
        self.drive.forward()
        while self.running:
            cm = bot.sonar.ping()
            if cm < 20:
                bot.find_path()

    def stop(self):
        self.drive.stop()
        self.sonar.bearing(1600)

bot = ScooterBot()
running = False

def handler(channel, event):
    if running:
        bot.stop()
    else:
        bot.start()
    running = not running

explorerhat.touch.pressed(handler)
