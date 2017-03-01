'use strict';

module.exports = (gpioService => {

    const MOTOR_A_KEY = 'A';
    const MOTOR_B_KEY = 'B';

    const MOTOR_A_FORWARD = 26;
    const MOTOR_A_BACKWARD = 21;
    const MOTOR_B_FORWARD = 20;
    const MOTOR_B_BACKWARD = 19;

    const DIRECTION_FORWARD = 'forward';
    const DIRECTION_BACKWARD = 'backward';

    const MOTOR_GPIO = {
        'A':{
            'forward': MOTOR_A_FORWARD,
            'backward': MOTOR_A_BACKWARD
        },
        'B': {
            'forward': MOTOR_B_FORWARD,
            'backward': MOTOR_B_BACKWARD
        }
    }

    const _service = gpioService;

    const _motors = {
        'A': {
            'power': 0,
            'direction': DIRECTION_FORWARD
        },
        'B': {
            'power': 0,
            'direction': DIRECTION_FORWARD
        }
    }

    const self = {
        list: (cmd) => {
            return _motors;
        },

        get: (cmd) => {
            return _motors[cmd.key.toUpperCase()];
        },

        set: (cmd) => {
            let key = cmd.key.toUpperCase();
            let level = parseInt(cmd.value);
            level = level > 255 ? 255 : level < 0 ? 0 : level;
            _motors[key].power = level;
            let direction = _motors[key]['direction'];
            let signal = MOTOR_GPIO[key][direction];
            _service.pwmWrite(signal, level);
            return self.get(cmd);
        },

        setall: (cmd) => {
            for (var key of Object.keys(_motors)) {
                let cmd = { 'key': key, 'value': cmd.value };
                self.set(cmd);
            }
            return self.list();
        }
    }
    return self;
});
