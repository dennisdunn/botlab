'use strict';

module.exports = (commandHandlers => {

    const handlers = commandHandlers;

    let uuid = () => {
        let num = Date.now().toString(16) + Math.random().toFixed(20).toString(16).substr(2);

        return num.slice(0, 8) + '-' + num.slice(8, 12) + '-' + num.slice(20, 32);
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
        let handler = handlers[cmd.target][cmd.action];
        let results = handler(cmd);

        return results;
    }
});
