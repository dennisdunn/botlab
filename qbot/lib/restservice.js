'use strict';

module.exports = (function () {

    const _handlers = {};

    const self = {
        registerHandler: (key, handler) => {
            _handlers[key] = handler;
        },

        dispatch: (req, res) => {
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
                'target': req.params.target
            }

            switch (req.method) {
                case 'GET':
                    cmd.action = req.params.key ? 'get' : 'list';
                    cmd.key = req.params.key;
                    cmd.value = req.params.value;
                    break;
                case 'POST':
                    if (req.params.value) {
                        cmd.action = 'set';
                        cmd.key = req.params.key;
                        cmd.value = req.params.value;
                    } else {
                        cmd.action = 'set';
                        cmd.value = req.params.key;
                    }
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
    }

    return self;
})();
