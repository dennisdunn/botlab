#!/usr/bin/env python

from flask import Flask, request, redirect, json, jsonify

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
    if cmd == "left":
        motorCtl.left()
    elif cmd == "right":
        motorCtl.right()
    elif cmd == "straight":
        motorCtl.straight()
    return jsonify(cmd)


@app.route("/api/v1/motor/<cmd>", methods=['POST'])
def motor(cmd):
    if cmd == "forward":
        motorCtl.forward()
    elif cmd == "reverse":
        motorCtl.reverse()
    return jsonify(cmd)



@app.route("/api/v1/throttle", methods=['POST'])
def throttle():
    data = json.loads(request.data)
    motorCtl.throttle(data)
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
