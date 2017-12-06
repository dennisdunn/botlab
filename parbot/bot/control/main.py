#!/usr/bin/env python3
from multiprocessing import Process, Queue

from rest.api import app

# start the rest process
# start the sonar process


if __name__ == "__main__":
    app.run(host="0.0.0.0")