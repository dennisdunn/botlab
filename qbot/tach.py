#!/usr/bin/python
""" Queue tachometer readings """

import sys
import getopt
import serial
import pika


def main(argv):
    """ Read tachometer values"""
    options = parseoptions(argv)
    port = openport(options)


def parseoptions(argv):
    """Parse the command line"""
    options = {}
    try:
        opts, args = getopt.getopt(argv, "hd:b:q:", ["device=", "baud=", "queue="])
    except getopt.GetoptError:
        #  print "% -d /dev/serial0 -b 112512" sys.argv[0]
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
        #    print "% -d /dev/serial0 -b 112512" sys.argv[0]
            sys.exit()
        elif opt in ("-d", "--device"):
            options["device"] = arg
        elif opt in ("-b", "--baud"):
            options["baud"] = arg
        elif opt in ("-q", "--queue"):
            options["queue"] = arg
    return options

def openport(options):
    """Open the given serial port"""
    ser = serial.Serial(
        port=options["device"],
        baudrate=options["baud"],
        parity=serial.PARITY_ODD,
        stopbits=serial.STOPBITS_TWO,
        bytesize=serial.SEVENBITS
    )
    return ser

def openqueue(options):
    """Connect to the tachometer queue"""

if __name__ == "__main__":
    main(sys.argv[1:])
