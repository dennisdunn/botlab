'use strict';

module.exports = (gpioService => {

    const MOTOR_A_KEY = 'A';
    const MOTOR_B_KEY = 'B';

    const MOTOR_A_FORWARD = 19;
    const MOTOR_A_BACKWARD = 20;
    const MOTOR_B_FORWARD = 21;
    const MOTOR_B_BACKWARD = 26;

    const DIRECTION_FORWARD = 'forward';
    const DIRECTION_BACKWARD = 'backward';

    const MOTOR_GPIO = {
        MOTOR_A_KEY: {
            DIRECTION_FORWARD: MOTOR_A_FORWARD,
            DIRECTION_BACKWARD: MOTOR_A_BACKWARD
        },
        MOTOR_B_KEY: {
            DIRECTION_FORWARD: MOTOR_B_FORWARD,
            DIRECTION_BACKWARD: MOTOR_B_BACKWARD
        }
    }

    const _service = gpioService;

    const _motors = {
        MOTOR_A_KEY: {
            'power': 0,
            'direction': DIRECTION_FORWARD
        },
        MOTOR_B_KEY: {
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
            let level = parseInt(cmd.value);
            level = level > 255 ? 255 : level < 0 ? 0 : level;
            _motors[cmd.key.toUpperCase()].power = level;
            let direction = _motors[key]['direction'];
            let signal = MOTOR_GPIO[key][direction];
            let gpio = new gpio(signal, , { mode: Gpio.OUTPUT });
            gpio.pwmWrite(level);
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
