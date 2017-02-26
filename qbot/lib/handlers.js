'use strict';

module.exports = (gpioLib => {

    const Gpio = gpioLib;

    const BLUE_LED = 4;
    const GREEN_LED = 17;
    const RED_LED = 27;
    const YELLOW_LED = 5;

    const LEDS = {
        blue: BLUE_LED,
        green: GREEN_LED,
        red: RED_LED,
        yellow: YELLOW_LED
    };

    let get_gpio = pin => {
        let gpio = new Gpio(pin);
        return gpio.digitalRead();
    }

    let set_gpio = (pin, value) => {
        value = value === 'on' ? 1 : value;
        value = value === 'off' ? 0 : value;
        value = value ? 1 : 0;
        let gpio = new Gpio(pin);
        gpio.digitalWrite(value);
    }

    let motor_list = cmd => { }
    let motor_get = cmd => { }
    let motor_set = cmd => { }
    let motor_setall = cmd => { }

    let led_list = cmd => {
        let leds = [];
        for (var key of ['blue', 'red', 'yellow', 'green']) {
            let value = get_gpio(LEDS[key]);
            leds.push({'key':key, 'value':value});
        }
        return leds;
    }

    let led_get = key => {
        let value = get_gpio(LEDS[cmd.key]);
        return { key: key, value: value };
    }

    let led_set = (key, value) => {
        set_gpio(LEDS[key], value);
        return { key: key, value: value };
    }

    return {
        'motor': {
            'list': motor_list,
            'get': motor_get,
            'set': motor_set,
            'setall': motor_setall
        },
        'led': {
            'list': led_list,
            'get': led_get,
            'set': led_set
        }
    };
});
