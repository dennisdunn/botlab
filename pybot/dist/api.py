#!/usr/bin/env python

from flask import Flask, request, redirect, json
from motor import Motor

app = Flask(__name__)
motorCtl = Motor()


@app.route("/", methods=['GET'])
def index():
    return redirect("/static/index.html", code=302)


@app.route("/api/v1/steering/<cmd>", methods=['POST'])
def turn(cmd):
    data = json.loads(request.data)
    if cmd == "left":
        motorCtl.left(data)
    elif cmd == "right":
        motorCtl.right(data)
    elif cmd == "straight":
        motorCtl.straight()
    return data


@app.route("/api/v1/throttle", methods=['POST'])
def motors(cmd):
    data = json.loads(request.data)
    motorCtl.throttle(data)
    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0")
