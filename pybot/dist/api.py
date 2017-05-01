from flask import Flask, request, redirect
from Motor import Motor
import json

app = Flask(__name__)
motor = Motor()

@app.route("/", methods=['GET'])
def index():
    return redirect("/static/index.html", code=302)

@app.route("/api/v1/nav/<cmd>", methods=['POST'])
def turn(cmd):
    if cmd == "left":
        motor.left(request.values["timeout"])
    elif cmd == "right":
        motor.right(request.values["timeout"])
    elif cmd == "straight":
        motor.straight()
    return cmd

@app.route("/api/v1/motor/<cmd>", methods=['POST'])
def motors(cmd):
    print request.data
    if cmd == "forward":
        print "enter forward"
        motor.forward(request.data["speed"])
        print "exit forward"
    elif cmd == "reverse":
        motor.reverse(request.data["speed"])
    elif cmd == "throttle":
        motor.throttle(request.data["speed"])
    elif cmd == "stop":
        motor.stop()
    return cmd

if __name__ == "__main__":
    app.run(host="0.0.0.0")
