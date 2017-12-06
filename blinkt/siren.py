from blinkt import set_pixel, set_brightness, show, clear
import time

lo = 0
hi = 4

set_brightness(0.1)

def set_nybble(idx, r,g,b):
    for i in range( idx,idx+4):
        set_pixel(i, r, g, b)

if __name__ == "__main__":
    while True:
        set_nybble(hi, 128, 0, 0)
        set_nybble(lo, 0, 0, 128)
        show()
        time.sleep(0.5)
        set_nybble(hi, 0, 0, 128)
        set_nybble(lo, 128, 0, 0)
        show()
        time.sleep(0.5)

