'use strict';

module.exports = (gpio => {

    const _gpio = gpio;

    const self = {
        read: (pin) => {
            let gpio_pin = new _gpio(pin);
            return gpio_pin.digitalRead();
        },

        write: (pin, value) => {
            switch (value.toLowerCase()) {
                case '1':
                case 'on':
                case 'yes':
                case 'ok':
                    value = 1;
                    break;
                default:
                    value = 0;
            }
            let gpio_pin = new _gpio(pin);
            gpio_pin.digitalWrite(value);
        },

        pwmWrite:(pin,value)=> {
            let gpio_pin = new _gpio(pin, { mode: _gpio.OUTPUT });
            gpio_pin.pwmWrite(value);
        },

        pwmRead:(pin)=> {
            let gpio_pin = new _gpio(pin)
                gpio_pin.pwmRead();
        }
    };

    return self;
});

