declare function require(name:string);
let Gpio = require('pigpio').Gpio;

class Pid {
    setpoint : number;
    freq : number;
    Kp : number;
    Ki : number;
    Kd : number;

    private _signal : any;
    private _control : any;
    private _timer : any;
    private _irqCount : number;
    private _integral : number;
    private _differential : number;

    constructor(signalPin : number, controlPin : number, frequency : number){
        this._signal = new Gpio(signalPin, {mode:Gpio.INPUT});
        this._signal.on('interrupt', function(){
            this._irqCount++;
        });
        this._control = new Gpio(controlPin, {mode:Gpio.OUTPUT});
        this.freq = frequency;
        this._integral = 0;
        this._differential = 0;
        this._irqCount = 0;
    }

    start() {
        this._timer = setInterval(function(level,tick){
            var n = this._irqCount;
            this._irqCount = 0;
            var correctiveSignal = this.f(n);
            this.applyCorrection(correctiveSignal);
        }, 1000/this.freq);
        this._signal.enableInterrupt(Gpio.RISING_EDGE);
    }

    stop() {
        clearInterval(this._timer);
        this._signal.disableInterrupt();
    }
    
    f(n:number){
       return (this.Kp || 0)*n + (this.Ki || 0)*this._integral + (this.Kd || 0)*this._differential; 
    }
}
