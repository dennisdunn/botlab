from flask import Flask, request, redirect
from motor import Motor
import json

app = Flask(__name__)
motorCtl = Motor()

@app.route("/", methods=['GET'])
def index():
    return redirect("/static/index.html", code=302)

@app.route("/api/v1/nav/<cmd>", methods=['POST'])
def turn(cmd):
    if cmd == "left":
        motorCtl.left(request.values["timeout"])
    elif cmd == "right":
        motorCtl.right(request.values["timeout"])
    elif cmd == "straight":
        motorCtl.straight()
    return cmd

@app.route("/api/v1/motor/<cmd>", methods=['POST'])
def motors(cmd):
    print(request.data)
    if cmd == "forward":
        print( "enter forward")
        motorCtl.forward(request.data["speed"])
        print( "exit forward")
    elif cmd == "reverse":
        motorCtl.reverse(request.data["speed"])
    elif cmd == "throttle":
        motorCtl.throttle(request.data["speed"])
    elif cmd == "stop":
        motorCtl.stop()
    return cmd

if __name__ == "__main__":
    app.run(host="0.0.0.0")
