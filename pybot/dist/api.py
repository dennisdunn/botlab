#!/usr/bin/env python

from flask import Flask, request, redirect, json

from flask_cors import CORS
from motor import Motor

app = Flask(__name__)
CORS(app)

motorCtl = Motor()


@app.route("/", methods=['GET'])
def index():
    return redirect("/static/index.html", code=302)


@app.route("/api/v1/steering/<cmd>", methods=['POST'])
def steering(cmd):
    data = json.loads(request.data)
    if cmd == "left":
        motorCtl.left(data)
    elif cmd == "right":
        motorCtl.right(data)
    elif cmd == "straight":
        motorCtl.straight()
    response = cmd
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/v1/motor/<cmd>", methods=['POST'])
def motor(cmd):
    if cmd == "forward":
        motorCtl.forward()
    elif cmd == "reverse":
        motorCtl.reverse()
    response = cmd
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/v1/throttle", methods=['POST'])
def throttle():
    data = json.loads(request.data)
    motorCtl.throttle(data)
    response = str(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0")
