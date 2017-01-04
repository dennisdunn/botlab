var Gpio = require('pigpio').Gpio;

module.exports = (function () {

    function Pid(signalPin, controlPin, frequency, setpoint) {
        this.freq = frequency;
        this.setpoint = setpoint;
        this.Kp = 1;
        this.Ki = 0;
        this.Kd = 0;
        this._currentControl = 0;
        this._integral = 0;
        this._differential = 0;
        this._irqCount = 0;
        this._signal = new Gpio(signalPin, { 
            mode: Gpio.INPUT, 
            pullUpDown: Gpio.PUD_DOWN, 
        }); 
        this._control = new Gpio(controlPin, { mode: Gpio.OUTPUT }); 
    }

    Pid.prototype.start = function () {
        var self = this;

        this._timer = setInterval(function () {
            var n = self._irqCount;
            self._irqCount = 0;
            var rpm = self.rpm(n);
//            console.log("rpm="+rpm);
            console.log("n="+n);
            var error = self.setpoint - rpm;
            var correctiveSignal = self.f(error);
            self.applyCorrection(correctiveSignal);
        }, 1000 / this.freq);

        this._signal.on('interrupt', function (level) { 
            self._irqCount++; 
        }); 

        this._signal.enableInterrupt(Gpio.RISING_EDGE);
    };

    Pid.prototype.applyCorrection = function(level){
        this._currentControl = this._currentControl + level;
        this._currentControl = Math.min(this._currentControl, 255);
        this._currentControl = Math.max(this._currentControl, 0);
        this._control.pwmWrite(this._currentControl);
    };

    Pid.prototype.rpm = function(sampleCount){
        return 3 * sampleCount * this.freq;
    };

    Pid.prototype.stop = function () {
        clearInterval(this._timer);
        this._signal.disableInterrupt();
    };

    Pid.prototype.f = function (error) {
        return this.Kp * error;
    };

    return Pid;
}());
