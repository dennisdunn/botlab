#!/usr/bin/env node

'use strict';

const QUEUE_NAME = 'commands';

let actions = require('./actions');
let process = require('process');
let amqp = require('amqplib');

amqp.connect('amqp://localhost')
    .then(conn => {
        return conn.createChannel();
    })
    .then(ch => {
        ch.assertQueue(QUEUE_NAME, { durable: false });
        ch.prefetch(1);
        ch.consume(QUEUE_NAME, msg => {
            let payload = JSON.parse(msg.content.toString());
            try {
                let handler = actions[payload.target][payload.action];
                let result = handler(payload);
                let buffer = new Buffer(JSON.stringify(result));

                ch.sendToQueue(msg.properties.reply_to, buffer, {
                    correlation_id: msg.properties.correlation_id
                });

                ch.ack(msg);
            } catch (ex) {
                console.log(ex);
                console.log(payload);
            }
        }, { noAck: true });
    })
    .catch(console.warn);

process.on('SIGINT', () => {
    process.exit();
});
