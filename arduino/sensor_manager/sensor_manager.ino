#include <NewPing.h>
#include <Sonar.h>
#include <Tach.h>

#define SENSOR_SONAR 14
#define SENSOR_TACH_0 2
#define SENSOR_TACH_1 3
#define MAX_DISTANCE 300
#define LED13 13
#define FREQ 20

void tach_0_dispatcher();
void tach_1_dispatcher();

Sonar sonar(SENSOR_SONAR, MAX_DISTANCE);
Tach tach_0(SENSOR_TACH_0, tach_0_dispatcher);
Tach tach_1(SENSOR_TACH_1, tach_1_dispatcher);

void setup() {
  digitalWrite(LED13,LOW);
  Serial.begin(115200);
}

void loop() {
  send("sonar", sonar.get_range());
  send("tach0", tach_0.get_rpm());
  send("tach1", tach_1.get_rpm());
  delay(1000/FREQ);
}

void send(const String& label, int value)
{
  digitalWrite(LED13,HIGH);
  Serial.print("{\"type\":");
  Serial.print(label);
  Serial.print("\", \"value\":");
  Serial.print(value);
  Serial.print("}");
  Serial.println();
  digitalWrite(LED13,LOW);
}

void tach_0_dispatcher(){
  tach_0.handler();
}

void tach_1_dispatcher(){
  tach_1.handler();
}



