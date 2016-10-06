#include <Wire.h>
#include <NewPing.h>

#define MAX_DISTANCE 500
#define INVALID_DATA -1
#define RANGE_HIGH 50
#define RANGE_LOW 5

#define SONAR_NUM 4
#define MEDIAN 8

#define ADDR_SELECT 4
#define ENABLE 2

#define SCL 19 // A5
#define SDA 18 // A4

#define I2C_ADDR 0x34
#define I2C_ALT_ADDR 0x44

int IRQ[SONAR_NUM] = {
  6,
  7,
  8,
  9
};

NewPing SONAR[SONAR_NUM] = {
  NewPing(14, 14, MAX_DISTANCE),
  NewPing(12, 12, MAX_DISTANCE),
  NewPing(11, 11, MAX_DISTANCE),
  NewPing(10, 10, MAX_DISTANCE)
};

int ranges[SONAR_NUM] = {
  -1, -1, -1, -1
};

void setup() {
  Serial.begin(115200);

  for (int i = 0; i < SONAR_NUM; i++) {
    pinMode(IRQ[i], OUTPUT);
    digitalWrite(IRQ[i], LOW);
  }

  pinMode(ADDR_SELECT, INPUT_PULLUP);
  pinMode(ENABLE, INPUT_PULLUP);

  Wire.begin(digitalRead(ADDR_SELECT) ? I2C_ADDR : I2C_ALT_ADDR);
  Wire.onRequest(requestEvent);
}

void loop() {
  for (int i = 0; i < SONAR_NUM; i++) {
    digitalWrite(IRQ[i], LOW);
    if (isEnabled()) {
      ranges[i] = ping(i);
      if (i % 2) {
        if (ranges[i] < RANGE_LOW) {
          digitalWrite(IRQ[i], HIGH);
        }
      } else {
        if (ranges[i] > RANGE_HIGH) {
          digitalWrite(IRQ[i], HIGH);
        }
      }
      report();
    }
  }
}

void report() {
  for (int i = 0; i < SONAR_NUM; i++) {
    Serial.print(ranges[i]);
    if (i < SONAR_NUM - 1) {
      Serial.print(",");
    }
  }
  Serial.println();
}

int ping(int id) {
  long echo = SONAR[id].ping_median(MEDIAN);
  int range = SONAR[id].convert_cm(echo);
  if (range == 0) {
    range = INVALID_DATA;
  }
  return range;
}

bool isEnabled() {
  return digitalRead(ENABLE);
}

void requestEvent(){
  byte buffer[SONAR_NUM * 2];
  memcpy(ranges, buffer, sizeof(buffer));
  Wire.write(buffer, sizeof(buffer));
}

