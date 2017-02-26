'use strict';

module.exports = (amqp => {

    const COMMAND_QUEUE = 'commands';

    let channel = null;

    amqp.connect('amqp://localhost',
        (err, conn) => {
            return conn.createChannel(
                    (err, ch)=> {
                        channel=ch;
                    })});

    let uuid = () => {
        let num = Date.now().toString(16) + Math.random().toFixed(20).toString(16).substr(2);
        return num.slice(0, 8) + '-' + num.slice(8,12) + '-' + num.slice(20,32);
    }

    let enqueue = data => {
        let buffer = Buffer.from(JSON.stringify(data));
        channel.assertQueue(COMMAND_QUEUE, { durable: false },
            (err) => {
                return channel.sendToQueue(COMMAND_QUEUE, buffer);
            });
    }

    let rpc_call = cmd => {
        let buffer = Buffer.from(JSON.stringify(cmd));
        channel.assertQueue('', { exclusive: true },
            (err, q) => {
                channel.consume(q.queue, msg =>{
                   return  msg;
                }, { noAck: true });
                channel.sendToQueue(COMMAND_QUEUE, buffer, { 
                    content_type:'application/json',
                    correlation_id: uuid(),
                    reply_to: q.queue});
            });
    }

    let commandFactory = req =>{
        let cmd = {
            'version': req.params.apiversion,
            'timestamp':Date.now(),
            'target':req.params.target
        }

        switch(req.method){
            case 'GET':
                cmd.action = req.params.key ? 'get':'list';
                break;
            case 'POST':
                cmd.action = req.params.key? 'set':'setall';
                break;
        }

        if(req.params.key){
            cmd.key = req.params.key;
        }

        if(req.params.value) {
            cmd.value = req.params.key;
        }

        return cmd;
    }

    return (req, res)=>{
        let cmd = commandFactory(req);
        console.log(cmd);
        let response = rpc_call(cmd);
        console.log(response);
        res.json(response);
    }
});
