#!/usr/bin/env node

'use strict'

let process = require('process');
let serial = require('serialport');
let amqp = require('amqplib')

let channel = null;

const serialOptions = {
    baud: 115200,
    device: '/dev/ttyUSB0'
};

const queueName = 'tach_readings';

amqp.connect('amqp://localhost').then(conn => {
    return conn.createChannel();
}).then(ch => {
    channel = ch;
}).catch(console.warn);

let port = new serial(serialOptions.device, {
    baudRate: serialOptions.baud,
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
            let msg = { topic: queueName, id: i, value: counts[i] };
            let buffer = Buffer.from(JSON.stringify(msg));
            channel.assertQueue(queueName).then(function (ok) {
                return channel.sendToQueue(queueName, buffer);
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
