'use strict';

let Gpio = require('pigpio').Gpio;
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors')

let gpioService = require('../lib/gpioservice')(Gpio);
let ledHandler = require('../lib/ledhandler')(gpioService);
let motorhandler = require('../lib/motorhandler')(gpioService);
let api = require('../lib/restservice');

api.registerHandler('led', ledHandler);
api.registerHandler('motor', motorhandler);

let app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api
app.get('/api/:apiversion/:target/:key', api.dispatch);
app.get('/api/:apiversion/:target', api.dispatch);

app.post('/api/:apiversion/:target/:key', api.dispatch);
app.post('/api/:apiversion/:target', api.dispatch);

// static content
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(8080, () => console.log('Listening on :8080'));
