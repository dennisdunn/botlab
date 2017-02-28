'use strict';

module.exports = (gpioService => {

    const _service = gpioService;
    const _motors = [{ 'power': 0 }, { 'power': 0 }];

    const self = {
        list: (cmd) => {
            return _motors;
        },

        get: (cmd) => {
            return _motors[cmd.key];
        },

        set: (cmd) => {
            _motors[cmd.key].power =parseInt( cmd.value);
            return self.get(cmd);
        },

        setall: (cmd) => {
            for (var i = 0; i < _motors.length; i++) {
                self.set({ 'key': i, 'value': cmd.value });
            }
            return self.list();
        }
    }
    return self;
});
