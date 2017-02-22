#!/usr/bin/env node

'use strict'

let process = require('process');


const serialOptions = {
    baud: 115200,
    device: '/dev/ttyUSB0'
};

const queueOptions = {
    queue: 'tach_sensors',
    callback: (data) => { console.log(data) }
};

class PortMonitor {
    constructor(options = serialOptions) {
        let serial = require('serialport');
        this.settings = options;
        this.port = new serial(options.device, {
            baudRate: options.baud,
            parser: serial.parsers.readline('\n')
        });
        this.port.on('error', function (err) {
            console.log('Error: ', err.message);
        })
        this.port.on('data', this.transform);
    }

    transform(data) {
        let counts = JSON.parse(data);
        for (let i = 0; i < counts.length; i++) {
            let msg = { topic: 'tach_reading', id: i, value: counts[i] };
            if (this.settings.callback) this.settings.callback(msg);
        }
    }
};

class Publisher {
    constructor(options = queueOptions) {
        this.settings = options;
        let self = this;
        let open = require('amqplib').connect('amqp://localhost');

        open.then(function (conn) {
            return conn.createChannel();
        }).then(function (ch) {
            self.channel = ch;
        }).catch(console.warn);
    }

    publish(data) {
        console.log(data);
        let buffer = Buffer.from(JSON.stringify(data));

        return this.channel.assertQueue(this.settings.queue).then(function (ok) {
            return this.channel.sendToQueue(this.settings.queue, buffer);
        });
    }
};

//let publisher = new Publisher(queueOptions);
//serialOptions.callback = publisher.publish;
let mon = new PortMonitor(serialOptions);

process.on('SIGINT',()=>{
    process.exit();
});
