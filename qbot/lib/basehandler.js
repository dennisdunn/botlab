'use strict';

module.exports = class BaseHandler {
    constructor(gpio) {
        this.Gpio = gpio;

        this.get_gpio = this.get_gpio.bind(this);
        this.set_gpio = this.set_gpio.bind(this);
    }

    get_gpio(pin) {
        let gpio = new this.Gpio(pin);
        return gpio.digitalRead();
    }

    set_gpio(pin, value) {
        switch (value.toLowerCase()) {
            case '1':
            case 'on':
                value = 1;
                break;
            default:
                value = 0;
        }
        let gpio = new this.Gpio(pin);
        gpio.digitalWrite(value);
    }
}
