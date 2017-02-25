'use strict';

let express = require('express');
let path = require('path');
let amqp = require('amqplib');
let api = require('./api')(amqp);
let app = express();

// api
// control the LEDs
app.get('/api/:apiversion/led/:key', api.led.get);
app.get('/api/:apiversion/led', api.led.list);

app.post('/api/:apiversion/led/:key/:value', api.led.set);

// control the motors
app.get('/api/:apiversion/motor/:key', api.motor.get);
app.get('/api/:apiversion/motor', api.motor.list);

app.post('/api/:apiversion/motor/:key/:value', api.motor.set);
app.post('/api/:apiversion/motor/:value', api.motor.setall);

// static content
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(8080, () => console.log('Listening on :8080'));
