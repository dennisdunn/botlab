import SerialPort from serialport;

class Tach {
    constructor(options) {
        this.options = options;
        var SerialPort = require("serialport");
        this.port = new SerialPort(options.device, {
            baudRate: 115200,
            parser: SerialPort.parsers.readline('\n')
        });
        this.port.on('data', this.onData);
    }

    onData(data) {
        console.log(data);
    }
}