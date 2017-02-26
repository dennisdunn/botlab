'use strict';

module.exports = (amqp => {

    const COMMAND_QUEUE = 'commands';

    let channel = null;

    amqp.connect('amqp://localhost',
        (err, conn) => {
            return conn.createChannel(
                (err, ch) => {
                    channel = ch;
                })
        });

    let uuid = () => {
        let num = Date.now().toString(16) + Math.random().toFixed(20).toString(16).substr(2);
        return num.slice(0, 8) + '-' + num.slice(8, 12) + '-' + num.slice(20, 32);
    }

    let enqueue = data => {
        let buffer = Buffer.from(JSON.stringify(data));
        channel.assertQueue(COMMAND_QUEUE, { durable: false },
            (err) => {
                return channel.sendToQueue(COMMAND_QUEUE, buffer);
            });
    }

    let rpc_async = (cmd, callback) => {
        let buffer = Buffer.from(JSON.stringify(cmd));
        channel.assertQueue('', { exclusive: true },
            (err, q) => {
                channel.consume(q.queue, callback, { noAck: true });
                let cid = uuid();
                channel.sendToQueue(COMMAND_QUEUE, buffer, {
                    correlation_id: cid,
                    reply_to: q.queue
                },
                (err, ok) =>{
                   
                });
            });
    }

    let commandFactory = req => {
        let cmd = {
            'version': req.params.apiversion,
            'timestamp': Date.now(),
            'target': req.params.target
        }

        switch (req.method) {
            case 'GET':
                cmd.action = req.params.key ? 'get' : 'list';
                break;
            case 'POST':
                cmd.action = req.params.key ? 'set' : 'setall';
                break;
        }

        if (req.params.key) {
            cmd.key = req.params.key;
        }

        if (req.params.value) {
            cmd.value = req.params.key;
        }

        return cmd;
    }

    return (req, res) => {
        let cmd = commandFactory(req);
        rpc_async(cmd, res.json);
    }
});
