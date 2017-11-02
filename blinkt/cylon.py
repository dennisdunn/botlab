from blinkt import set_pixel, show, set_brightness, clear
import time

if __name__ == "__main__":
    set_brightness(0.1)
    while True:
        for i in range(0, 7):
            clear()
            set_pixel(i,128,0,0)
            show()
            time.sleep(0.1)
        for i in range(7, 0, -1):
            clear()
            set_pixel(i,128,0,0)
            show()
            time.sleep(0.1)

