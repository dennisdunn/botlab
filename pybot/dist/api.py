#!/usr/bin/env python

from flask import Flask, request, redirect, json
from motor import Motor

app = Flask(__name__)
motorCtl = Motor()

@app.route("/", methods=['GET'])
def index():
    return redirect("/static/index.html", code=302)

@app.route("/api/v1/nav/<cmd>", methods=['POST'])
def turn(cmd):
    data = json.loads(request.data) 
    if cmd == "left":
        motorCtl.left(data["timeout"])
    elif cmd == "right":
        motorCtl.right(data["timeout"])
    elif cmd == "straight":
        motorCtl.straight()
    return cmd

@app.route("/api/v1/motor/<cmd>", methods=['POST'])
def motors(cmd):
    data = json.loads(request.data) 
    if cmd == "forward":
        motorCtl.forward(data["speed"])
    elif cmd == "reverse":
        motorCtl.reverse(data["speed"])
    elif cmd == "throttle":
        motorCtl.throttle(data["speed"])
    elif cmd == "stop":
        motorCtl.stop()
    return cmd

if __name__ == "__main__":
    app.run(host="0.0.0.0")
