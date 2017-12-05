/**
 * Sonar subsystem to manage 4 sonar sensors and provide readings
 * over the I2C buss.
 */
#include <Wire.h>
#include <NewPing.h>

#define SENSOR_CNT 4
#define RANGE_THRESHOLD 10
#define MAX_DISTANCE 250
#define INVALID_DATA -1
#define LED13 13
#define ADDR_DEFAULT 0x20
#define ADDR_ALT 0x2F
#define PIN_ADDR_SELECT 3
#define PIN_NOTIFICATION 2
#define PIN_SENSOR_0 14
#define PIN_SENSOR_1 12
#define PIN_SENSOR_2 11
#define PIN_SENSOR_3 10
#define REGISTER_MAP_SIZE 11
#define DEVICE_ID 0x01
#define VALID 1
#define NOT_VALID 0
#define REGISTER_STATUS 0
#define REGISTER_CONFIG 9
#define REGISTER_DEVICE_ID 10
#define SENSOR_ENABLED(idx) ((registers[REGISTER_CONFIG]) & (1 << (idx)))
#define SENSOR_STATUS(idx, status) ((registers[REGISTER_STATUS]) ^= (~status ^ registers[REGISTER_STATUS] & (1 << (idx))))
#define SENSOR_DATA(idx, range) (registers[idx] = range)

// Register map
// 0x00 Status
// 0x01 Sensor 0 range MSB
// 0x02 Sensor 0 range LSB
// 0x03 Sensor 1 range MSB
// 0x04 Sensor 1 range LSB
// 0x05 Sensor 2 range MSB
// 0x06 Sensor 2 range LSB
// 0x07 Sensor 3 range MSB
// 0x08 Sensor 3 range LSB
// 0x09 Configuration
// 0x0A Device ID
unsigned char registers[REGISTER_MAP_SIZE];

// Sensor array
NewPing sensors[SENSOR_CNT] = {
    NewPing(PIN_SENSOR_0, PIN_SENSOR_0, MAX_DISTANCE),
    NewPing(PIN_SENSOR_1, PIN_SENSOR_1, MAX_DISTANCE),
    NewPing(PIN_SENSOR_2, PIN_SENSOR_2, MAX_DISTANCE),
    NewPing(PIN_SENSOR_3, PIN_SENSOR_3, MAX_DISTANCE)};

void setup()
{
  registers[REGISTER_MAP_SIZE - 1] = DEVICE_ID;
  registers[0] = 0x00;

  pinMode(PIN_NOTIFICATION, OUTPUT);
  pinMode(PIN_ADDR_SELECT, INPUT_PULLUP);

  Wire.begin(digitalRead(PIN_ADDR_SELECT)
                 ? ADDR_DEFAULT
                 : ADDR_ALT);
  Wire.onRequest(requestEvent);
  Wire.onReceive(receiveEvent);
}

void loop()
{
  for (int i = 0; i < SENSOR_CNT; i++)
  {
    SENSOR_STATUS(i, NOT_VALID);
    if (SENSOR_ENABLED(i))
    {
      long echo = sensors[i].ping();
      int range = sensors[i]].convert_cm(echo);
      if (range > 0)
      {
        SENSOR_DATA(i, range);
        SENSOR_STATUS(i, VALID);
      }
    }
  }
}

void requestEvent()
{
  Wire.send(registers, REGISTER_MAP_SIZE);
}

void receiveEvent(int length)
{
  // register the received command and parameter
}
