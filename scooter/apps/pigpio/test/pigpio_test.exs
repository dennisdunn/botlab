defmodule PigpioTest do
  use ExUnit.Case
  doctest Pigpio

  test "reads a GPIO pin" do
    Pigpio.start_link()
    Pigpio.write(4, 0)
    {:ok, result} = Pigpio.read(4)
    assert result == 0
  end

  test "writes to a GPIO pin" do
    Pigpio.start_link()
    Pigpio.write(4,1)
    {:ok, result} = Pigpio.read(4)
    assert result == 1
  end

  test "starts PWM on a GPIO pin" do
    Pigpio.start_link()
    {:ok, result} = Pigpio.pwm(19, 200)
    :timer.sleep(1000)
    assert Pigpio.pwm(19, 0)
    assert result == 0
  end

  test "positions a servo on a GPIO pin" do
    Pigpio.start_link()
    assert Pigpio.servo(4, 1000) == {:ok, 0}
  end

  test "monitors the state of a pin" do
    Pigpio.start_link()
    assert Pigpio.monitor(4) == {:ok, 0}
  end
end
