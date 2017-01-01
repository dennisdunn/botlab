#include <NewPing.h>

#include <Sonar.h>
#include <Tach.h>

#define SENSOR 14
#define MAX_DISTANCE 300
#define LED13 13
#define FREQ 20

Sonar sonar(SENSOR, MAX_DISTANCE);

void setup() {
  Serial.begin(115200);
}

void loop() {
  digitalWrite(LED13,HIGH);
  Serial.println(sonar.get_range());
  digitalWrite(LED13,LOW);
  delay(1000/FREQ);
}

