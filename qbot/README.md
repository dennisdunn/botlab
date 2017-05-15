## Q-Bot
node-red was fine except for the fact that it is single threaded.
 By the time an incoming message was processed another would
 arrive. This pushed CPU usage and resulted in a locked bot,
 to busy to do anything.

 The bot uses a queue to route messages to various processes
 which each handle their own simple tasks.

  * Tachometer reader
  * PID calculator
  * Motor controller
  * Hardware controller
  * REST API

### Tachometer
For each line of input from the serial port, queue a 
timestamped message with the tachometer id and the
value.

### PID controller
Process a queue of readings and send the correction to 
an output queue. Listen for parameter set commands
to change the setpoint, Kp, Ki, and Kd values.

## Motor controller
Read control messages from the queue and use the pigpio
library to put PWM signals on the motor pins.

## Hardware controller
Use the pigpio library to set/clear pins and read from the
ADC and I2C buss.

### REST API
/motor
get - return settings of all the motors

/motor/power
get - return the power of all motors
put - set the power of all motors

/motor/direction
same as motor/power

/motor/:id
/motor/:id/power
/motot/:id/direction