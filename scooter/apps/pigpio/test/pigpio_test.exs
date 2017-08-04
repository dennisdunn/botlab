defmodule PigpioTest do
  use ExUnit.Case
  doctest Pigpio

  test "reads a GPIO pin" do
    assert Pigpio.read(4) == 0
  end

  test "writes to a GPIO pin" do
    assert Pigpio.write(4, 0) == 0
  end

  test "starts PWM on a GPIO pin" do
    assert Pigpio.pwm(4, 255) == 0
  end

  test "positions a servo on a GPIO pin" do
    assert Pigpio.servo(4, 1000) == 0
  end

  test "monitors the state of a pin" do
    assert Pigpio.monitor(4) == 0
  end
end