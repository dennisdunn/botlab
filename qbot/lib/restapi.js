'use strict';

module.exports = class RestApi {
    constructor() {
        this.handlers = {}
    }

    registerHandler(key, handler) {
        this.handlers[key] = handler;
    }

    commandFactory(req) {
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
            cmd.value = req.params.value;
        }

        return cmd;
    }

    dispatch(req, res) {
        let cmd = this.commandFactory(req);
        let handler = this.handlers[cmd.target][cmd.action];
        let results = handler(cmd);

        res.json(results);
    }
}
