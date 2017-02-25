'use strict';

let express = require('express');
let path = require('path');
let amqp = require('amqplib');
let api = require('./api')(amqp);
let app = express();

// api
app.get('/api/:apiversion/:target/:key/:value', api.led.get);
app.get('/api/:apiversion/:target/:key', api.led.get);
app.get('/api/:apiversion/:target', api.led.list);

app.post('/api/:apiversion/:target/:key/:value', api.led.get);
app.post('/api/:apiversion/:target/:key', api.led.get);
app.post('/api/:apiversion/:target', api.led.list);

// static content
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(8080, () => console.log('Listening on :8080'));
