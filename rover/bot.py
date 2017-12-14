import pigpio
from drive import Drive


pi = pigpio.pi()
drive = Drive(pi, 21, 26, 20, 19)

def getRange():
    pi.get_i2c_word(1, 0x20, 0x01)
    

if __name__ == "__main__":
    pass
