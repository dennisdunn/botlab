'use strict';

let BaseHandler = require('./basehandler')

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

module.exports = class LedHandler extends BaseHandler {
    constructor(gpio) {
        super(gpio);
    }

    list(cmd) {
        let result = [];
        for (var key of ['blue', 'red', 'yellow', 'green']) {
            let value = this.get_gpio(LEDS[key]);
            result.push({ key: key, value: value });
        }
        return result;
    }

    get(cmd) {
        let value = this.get_gpio(LEDS[cmd.key]);
        let result = { key: cmd.key, value: value };

        return result;
    }

    set(cmd) {
        this.set_gpio(LEDS[cmd.key], cmd.value);
        let result = { key: cmd.key, value: cmd.value };

        return result;
    }
}
