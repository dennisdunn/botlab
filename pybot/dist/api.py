from flask import Flask, request, redirect
import Motor

app = Flask(__name__)
motor = Motor.Motor()

@app.route("/")
def index():
    return redirect("/static/index.html", code=302)

@app.route("/api/v1/nav/<cmd>")
def turn(cmd):
    if cmd == "left":
        motor.left(request.values["timeout"])
    elif cmd == "right":
        motor.right(request.values["timeout"])
    elif cmd == "straight":
        motor.straight()
    return cmd

@app.route("/api/v1/motor/<cmd>")
def motors(cmd):
    if cmd == "forward":
        motor.forward(request.values["speed"])
    elif cmd == "reverse":
        motor.reverse(request.values["speed"])
    elif cmd == "throttle":
        motor.throttle(request.values["speed"])
    elif cmd == "stop":
        motor.stop()
    return cmd

if __name__ == "__main__":
    app.run(host="0.0.0.0")
