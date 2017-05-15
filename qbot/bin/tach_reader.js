#!/usr/bin/env node

'use strict'

const API_VERSON = "v1";
const TARGET = "tachometer";
const QUEUE_NAME = 'tach_readings';
const SERIAL_OPTIONS = {
    baud: 115200,
    device: '/dev/ttyUSB0'
};

let process = require('process');
let serial = require('serialport');
let amqp = require('amqplib');

let channel = null;

amqp.connect('amqp://localhost').then(conn => {
    return conn.createChannel();
}).then(ch => {
    channel = ch;
}).catch(console.warn);

let port = new serial(SERIAL_OPTIONS.device, {
    baudRate: SERIAL_OPTIONS.baud,
    parser: serial.parsers.readline('\n')
});
port.on('error', (err) => {
    console.log(err);
})
port.on('data', (data) => {
    try {
        data = data.trim();
        let counts = JSON.parse(data);

        for (let i = 0; i < counts.length; i++) {
            let msg = {
                version: API_VERSON,
                timestamp: Date.now(),
                target: TARGET,
                key: i,
                value: counts[i]
            };
            let buffer = Buffer.from(JSON.stringify(msg));
            channel.assertQueue(QUEUE_NAME, { durable: false }).then(function (ok) {
                return channel.sendToQueue(QUEUE_NAME, buffer);
            });
        }
    }
    catch (e) {
        // do nothing, more data is comming soon
    }
});

process.on('SIGINT', () => {
    process.exit();
});
