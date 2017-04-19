import explorerhat


def forward(speed):
    if speed < 50:
        speed = 50:
    explorerhat.motor.formwards(speed)


def stop():
    explorerhat.motor.forwards(0)


def left(seconds):
    explorerhat.motor.two.forwards(0)
    sleep(seconds)
    explorerhat.motor.two.forwards(50)

def right(seconds):
    explorerhat.motor.one.forwards(0)
    sleep(seconds)
    explorerhat.motor.one.forwards(50)
