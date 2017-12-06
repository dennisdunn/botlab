/**
   Sonar subsystem to manage 4 sonar sensors and provide readings
   over the I2C buss.

   See http://dsscircuits.com/articles/arduino-i2c-slave-guide
*/
#include <Wire.h>
#include <NewPing.h>

#define SENSOR_CNT 4
#define RANGE_THRESHOLD 10
#define MAX_DISTANCE 300
#define LED13 13
#define ADDR_DEFAULT 0x20
#define ADDR_ALT 0x2F
#define PIN_IRQ 2
#define PIN_ADDR_SELECT 3
#define PIN_DEBUG 4
#define PIN_SENSOR_0 14
#define PIN_SENSOR_1 12
#define PIN_SENSOR_2 11
#define PIN_SENSOR_3 10
#define COMMAND_BUF_SIZE 2
#define REGISTER_MAP_SIZE 11
#define REGISTER_BUF_SIZE 9
#define INITIAL_STATUS 0x00
#define DEFAULT_CONFIG 0x01
#define DEVICE_ID 0x01
#define REGISTER_STATUS 0
#define REGISTER_CONFIG 9
#define REGISTER_DEVICE_ID 10

// Register map
// 0x00 Status LSB = sensor 0 has data, bit 2 = sensor 1 has data, etc
// 0x01 Sensor 0 range MSB
// 0x02 Sensor 0 range LSB
// 0x03 Sensor 1 range MSB
// 0x04 Sensor 1 range LSB
// 0x05 Sensor 2 range MSB
// 0x06 Sensor 2 range LSB
// 0x07 Sensor 3 range MSB
// 0x08 Sensor 3 range LSB
// 0x09 Configuration LSB = enable sensor 0, bit 2 = enable sensor 1, etc
// 0x0A Device ID
byte registers[REGISTER_MAP_SIZE];

byte commands[COMMAND_BUF_SIZE];

// Sensor array
NewPing sensors[SENSOR_CNT] = {
  NewPing(PIN_SENSOR_0, PIN_SENSOR_0, MAX_DISTANCE),
  NewPing(PIN_SENSOR_1, PIN_SENSOR_1, MAX_DISTANCE),
  NewPing(PIN_SENSOR_2, PIN_SENSOR_2, MAX_DISTANCE),
  NewPing(PIN_SENSOR_3, PIN_SENSOR_3, MAX_DISTANCE)
};

void setup()
{
  registers[REGISTER_DEVICE_ID] = DEVICE_ID;
  registers[REGISTER_CONFIG] = DEFAULT_CONFIG;

  pinMode(PIN_IRQ, OUTPUT);
  digitalWrite(PIN_IRQ, 0);

  pinMode(PIN_ADDR_SELECT, INPUT_PULLUP);
  Wire.begin(digitalRead(PIN_ADDR_SELECT)
             ? ADDR_DEFAULT
             : ADDR_ALT);

  Wire.onRequest(requestEvent);
  Wire.onReceive(receiveEvent);
}

void loop()
{
  registers[REGISTER_STATUS] = INITIAL_STATUS;
  for (int i = 0; i < SENSOR_CNT; i++)
  {
    if (bitRead(registers[REGISTER_CONFIG], i))
    {
      long echo = sensors[i].ping_median(3);
      int range = sensors[i].convert_cm(echo);
      if (range > 0)
      {
        noInterrupts();
        saveSensorData(i, range);
        registers[REGISTER_STATUS] = bitSet(registers[REGISTER_STATUS], i);
        interrupts();
        digitalWrite(PIN_IRQ, 1); // raise the IRQ
      }
    }
  }
}

void requestEvent()
{
  Wire.send(registers, REGISTER_BUF_SIZE);
  digitalWrite(PIN_IRQ, 0); // clear the IRQ
}

void receiveEvent(int length)
{
  for (int i = 0; i < length; i++) {
    if (i < COMMAND_BUF_SIZE) {
      commands[i] = Wire.receive();
    } else {
      Wire.receive();
    }
  }
}

// Save the sensor data into the appropriate big-endian register.
void saveSensorData(int sensor_number, int data)
{
  registers[sensor_number + 1] = highByte(data);
  registers[sensor_number + 2] = lowByte(data);
}
