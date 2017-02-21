#!/usr/bin/env node

'use strict'

let serial = require('serialport');
let amqp = require('amqplib/callback_api');

const defaultOptions = {
    baud: 115200,
    device: '/dev/ttyUSB0'
};

class Tach {
    constructor(options = defaultOptions) {
        this.port = new serial(options.device, {
            baudRate: options.baud,
            parser: serial.parsers.readline('\n')
        });
        this.port.on('data', this.onData);
    }

    onData(data) {
        console.log(data);
    }
}

var tach_reader = new Tach();
