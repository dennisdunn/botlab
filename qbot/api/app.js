'use strict';

let express = require('express');
let path = require('path');

let gpioLib = require('pigpio');
let commandHandlers = require('../lib/handlers')(gpioLib);
let dispatch = require('../lib/rest')(commandHandlers);

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
