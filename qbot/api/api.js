'use strict';

module.exports = (amqp => {

    const queueName = 'commands';

    let channel = null;

    amqp.connect('amqp://localhost').then(conn => {
        return conn.createChannel();
}).then(ch => {
    channel = ch;
}).catch(console.warn);

    let enqueue = data => {
        let buffer = Buffer.from(JSON.stringify(data));
        channel.assertQueue(queueName, { durable: false }).then(function (ok) {
            return channel.sendToQueue(queueName, buffer);
        });
    }

    return {
        led: {
            list: (req, res) => {
                let cmd = {
                    version: req.params.apiversion,
                    timestamp: Date.now(),
                    target: 'led',
                    action: 'list'
                };
                enqueue(cmd);
                res.json(cmd);
            },
            get: (req, res) => {
                let cmd = {
                    version: req.params.apiversion,
                    timestamp: Date.now(),
                    target: 'led',
                    action: 'get',
                    key: req.params.key
                };
                enqueue(cmd);
                res.json(cmd);
            },
            set: (req, res) => {
                let cmd = {
                    version: req.params.apiversion,
                    timestamp: Date.now(),
                    target: 'led',
                    action: 'set',
                    key: req.params.key,
                    value: req.params.value
                };
                enqueue(cmd);
                res.json(cmd);
            }
        },
        motor: {
            list: (req, res) => {
                let cmd = {
                    version: req.params.apiversion,
                    timestamp: Date.now(),
                    target: 'motor',
                    action: 'list'
                };
                enqueue(cmd);
                res.json(cmd);
            },
            get: (req, res) => {
                let cmd = {
                    version: req.params.apiversion,
                    timestamp: Date.now(),
                    target: 'motor',
                    action: 'get',
                    key: req.params.key
                };
                enqueue(cmd);
                res.json(cmd);
            },
            set: (req, res) => {
                let cmd = {
                    version: req.params.apiversion,
                    timestamp: Date.now(),
                    target: 'motor',
                    action: 'set',
                    key: req.params.key,
                    value: req.params.value
                };
                enqueue(cmd);
                res.json(cmd);
            },
            setall: (req, res) => {
                let cmd = {
                    version: req.params.apiversion,
                    timestamp: Date.now(),
                    target: 'motor',
                    action: 'setall',
                    value: req.params.value
                };
                enqueue(cmd);
                res.json(cmd);
            }
        }
    }
});
