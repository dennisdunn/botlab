'use strict';

let express = require('express');
let path = require('path');
let amqp = require('amqplib/callback_api');
let dispatch = require('./api')(amqp);
let app = express();

// api
app.get('/api/:apiversion/:target/:key/:value', dispatch);
app.get('/api/:apiversion/:target/:key', dispatch);
app.get('/api/:apiversion/:target', dispatch);

app.post('/api/:apiversion/:target/:key/:value', dispatch);
app.post('/api/:apiversion/:target/:key', dispatch);
app.post('/api/:apiversion/:target', dispatch);

// static content
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(8080, () => console.log('Listening on :8080'));
