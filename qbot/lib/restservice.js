'use strict';

module.exports = (function () {

    const _handlers = {};

    const self = {
        registerHandler: (key, handler) => {
            _handlers[key] = handler;
        },

        dispatch: (req, res) => {
            return; // TODO remove this once the joystick is working
            let cmd = self.commandFactory(req);
            let handler = _handlers[cmd.target][cmd.action];
            let results = handler(cmd);

            res.json(results);
        },

        handlers: () => {
            return _handlers;
        },

        commandFactory: (req) => {
            let cmd = {
                'version': req.params.apiversion,
                'timestamp': Date.now(),
                'target': req.params.target,
                'key':req.params.key,
                'value':req.body.value
            }
            switch (req.method) {
                case 'GET':
                    cmd.action = req.params.key ? 'get' : 'getall';
                    break;
                case 'POST':
                    cmd.action = req.params.key ? 'set' : 'setall';
                    break;
            }
            return cmd;
        }
    }

    return self;
})();
