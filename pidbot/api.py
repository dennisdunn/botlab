from flask import Flask, request, redirect
from explorer import *

app = Flask(__name__)

@app.route("/")
def index():
    return redirect("/static/index.html", code=302)

@app.route("/api/led/<color>")
def led(color):
    if color == "red":
       led = Light.Red
    elif color == "yellow":
        led = Light.Yellow
    elif color == "blue":
        led = Light.Blue
    elif color == "green":
        led = Light.Green

    try:
        state = request.values["state"]
        if state == "on":
            led.on()
        elif state == "off":
            led.off()
        return state
    except:
        return "on" if led.status() else "off"

@app.route("/api/motors/turn/<cmd>")
def turn(cmd):
    if cmd == "left":
        Motors.left(request.values["rate"])
    elif cmd == "right":
        Motors.right(request.values["rate"])
    elif cmd == "cancel":
        Motors.setPower(Motors.getPower())
    return cmd

@app.route("/api/motors/<cmd>")
def motors(cmd):
    if cmd == "forward":
        Motors.forward(request.values["delta"])
    elif cmd == "reverse":
        Motors.reverse(request.values["delta"])
    elif cmd == "stop":
        Motors.stop()
    return cmd

@app.route("/api/options/<option>")
def setOptions(option):
    if(option == "maxpower"):
        try:
            val = request.values["value"]
            Motors.setMaxPower(val)
            return val
        except:
            return Motors.getMaxPower()
    elif(option == "minpower"):
        try:
            val = request.values["value"]
            Motors.setMinPower(val)
            return val
        except:
            return Motors.getMinPower()          
    return option

if __name__ == "__main__":
    app.run(host="0.0.0.0")
