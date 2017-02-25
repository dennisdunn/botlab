'use strict';

module.exports = (amqp => {

    const COMMAND_QUEUE = 'commands';

    let channel = null;

    amqp.connect('amqp://localhost')
        .then(conn => {
            return conn.createChannel();
        })
        .then(ch => {
            channel = ch;
        })
        .catch(console.warn);

    let uuid = () => {
        let num = Date.now().toString(16) + Math.random().toFixed(20).toString(16).substr(2);
        return num.slice(0, 8) + '-' + num.slice(8,12) + '-' + num.slice(20,32);
    }

    let enqueue = data => {
        let buffer = Buffer.from(JSON.stringify(data));
        channel.assertQueue(COMMAND_QUEUE, { durable: false })
            .then(function (ok) {
                return channel.sendToQueue(COMMAND_QUEUE, buffer);
            });
    }

    let rpc_call = cmd => {
        let buffer = Buffer.from(JSON.stringify(cmd));
        channel.assertQueue('', { exclusive: true })
            .then((err, q) => {
                channel.consume(q.name, msg => (msg), { noAck: true });
                channel.sendToQueue(COMMAND_QUEUE, buffer, { correlationId: uuid(), reply_to: q.name });
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
                let response = rpc_call(cmd);
                res.json(response);
            },
            get: (req, res) => {
                let cmd = {
                    version: req.params.apiversion,
                    timestamp: Date.now(),
                    target: 'led',
                    action: 'get',
                    key: req.params.key
                };
                let response = rpc_call(cmd);
                res.json(response);
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
                let response = rpc_call(cmd);
                res.json(response);
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
                let response = rpc_call(cmd);
                res.json(response);
            },
            get: (req, res) => {
                let cmd = {
                    version: req.params.apiversion,
                    timestamp: Date.now(),
                    target: 'motor',
                    action: 'get',
                    key: req.params.key
                };
                let response = rpc_call(cmd);
                res.json(response);
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
                let response = rpc_call(cmd);
                res.json(response);
            },
            setall: (req, res) => {
                let cmd = {
                    version: req.params.apiversion,
                    timestamp: Date.now(),
                    target: 'motor',
                    action: 'setall',
                    value: req.params.value
                };
                let response = rpc_call(cmd);
                res.json(response);
            }
        }
    }
});
