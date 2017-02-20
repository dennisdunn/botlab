#!/usr/bin/python
""" Queue tachometer readings """

import sys
import getopt
import atexit
import serial
import pika

def main(argv):
    """ Read tachometer values"""
    options = parseoptions(argv)
    options["port"] = openport(options)
    options["queue"] = openqueue(options)

    atexit.register(close, options)

    while 1:
        #read serial(
        data = options["port"] .readLine()
        vals = data.split(",")
        for i in range(0, 1):
            msg = {}
            msg["tach_{}".format(i)] = int(vals[i])
            options["queue"].basic_publish(exchange='', routing_key=options["queueName"], body=msg)




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
    channel.queue_declare(queue=options["queueName"])
    return channel

def close(options):
    """Cleanup"""
    options["port"].close()
    options["queue"].close()

if __name__ == "__main__":
    main(sys.argv[1:])
