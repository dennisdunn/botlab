#!/usr/bin/env node

'use strict'

let process = require('process');
let amqp = require('amqplib');

const queueName = 'commands';

let channel = null;

amqp.connect('amqp://localhost').then(conn => {
    return conn.createChannel();
}).then(ch => {
    channel = ch;
}).catch(console.warn);


process.on('SIGINT', () => {
    process.exit();
});
