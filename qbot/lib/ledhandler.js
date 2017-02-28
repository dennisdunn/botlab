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

    return {
        list: (cmd) => {
            let result = [];
            for (var key of Object.keys(LEDS)) {
                let value = gpioService.get_gpio(LEDS[key]);
                result.push({ key: key, value: value });
            }
            return result;
        },

        get: (cmd) => {
            let value = gpioService.get_gpio(LEDS[cmd.key]);
            let result = { key: cmd.key, value: value };

            return result;
        },

        set: (cmd) => {
            gpioService.set_gpio(LEDS[cmd.key], cmd.value);
            let result = { key: cmd.key, value: cmd.value };

            return result;
        }
    }
})
