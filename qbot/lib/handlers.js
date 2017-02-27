'use strict';

module.exports = (Gpio => {

    const BLUE_LED = 4;
    const GREEN_LED = 5;
    const RED_LED = 27;
    const YELLOW_LED = 17;

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
        switch(value.toLowerCase()){
            case '1':
            case 'on':
                value = 1;
                break;
            default:
                value = 0;
        }
        let gpio = new Gpio(pin);
        gpio.digitalWrite(value);
    }

    let motor_list = cmd => { }
    let motor_get = cmd => { }
    let motor_set = cmd => { }
    let motor_setall = cmd => { }

    let led_list = cmd => {
        let result = [];
        for (var key of ['blue', 'red', 'yellow', 'green']) {
            let value = get_gpio(LEDS[key]);
            result.push({key: key, value:value});
        }

        return result;
    }

    let led_get = cmd => {
        let value = get_gpio(LEDS[cmd.key]);
        let result = { key: cmd.key, value: value };

        return result;
    }

    let led_set = cmd => {
        set_gpio(LEDS[cmd.key], cmd.value);
        let result = { key: cmd.key, value: cmd.value };

        return result;
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
