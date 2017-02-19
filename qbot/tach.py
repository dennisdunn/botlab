#!/usr/bin/python
""" Queue tachometer readings """

import sys
import getopt
import serial
import pika
import atexit

def main(argv):
    """ Read tachometer values"""
    options = parseoptions(argv)
    options["port"] = openport(options)
    options["queue"] = openqueue(options)

    atexit.register(close, options)

    while(1):
        #read serial(
        data = port.readLine()
        vals = data.split(",")
        for in range(0,1):
            msg = {}
            msg["tach_{}".format(i))] = int(vals[i])
            channel.basic_publish(exchange='', routing_key=options["queueName"], body=msg)


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
            options["queueName"] = arg
    return options

def openport(options):
    """Open the given serial port"""
    ser = serial.Serial(
        port=options["device"],
        baudrate=options["baud"],
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS
    )
    return ser

def openqueue(options):
    """Connect to the tachometer queue"""
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue=options[queueName])
    return channel

def close(options):
    """Cleanup"""
    options["port"].close()
    options["queue"].close()

if __name__ == "__main__":
    main(sys.argv[1:])
