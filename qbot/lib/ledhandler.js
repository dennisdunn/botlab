'use strict';

module.exports = (gpioService => {

    const BLUE_LED = 4;
    const GREEN_LED = 5;
    const RED_LED = 27;
    const YELLOW_LED = 17;

    const LEDS = {
        blue: BLUE_LED,
        green: GREEN_LED,
        red: RED_LED,
        yellow: YELLOW_LED
    }

    const _service = gpioService;

    const self = {
        get: (cmd) => {
            let value = _service.read(LEDS[cmd.key]);
            let result = { key: cmd.key, value: value };

            return result;
        },

        getall: (cmd) => {
            let result = [];
            for (var key of Object.keys(LEDS)) {
                let value = _service.read(LEDS[key]);
                result.push({ key: key, value: value });
            }
            return result;
        },

        set: (cmd) => {
            _service.write(LEDS[cmd.key], cmd.value);
            let result = { key: cmd.key, value: cmd.value };

            return result;
        },

        setall: (cmd) => {
            let result = [];
            for (var key of Object.keys(LEDS)) {
                _service.write(LEDS[key], cmd.value);
                result.push({ key: cmd.key, value: cmd.value });
            }
            return result;
        }
    }
    return self;
});
