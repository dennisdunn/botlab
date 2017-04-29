from flask import Flask, request, redirect
import Motor

app = Flask(__name__)
motor = Motor.Motor()

@app.route("/")
def index():
    return redirect("/static/index.html", code=302)

@app.route("/api/motors/turn/<cmd>")
def turn(cmd):
    if cmd == "left":
        morot.left(request.values["rate"])
    elif cmd == "right":
        motor.right(request.values["rate"])
    elif cmd == "cancel":
        motor.setPower()
    return cmd

@app.route("/api/motors/<cmd>")
def motors(cmd):
    if cmd == "forward":
        motor.forward(request.values["power"])
    elif cmd == "reverse":
        motor.reverse(request.values["power"])
    elif cmd == "stop":
        motor.stop()
    return cmd

if __name__ == "__main__":
    app.run(host="0.0.0.0")
