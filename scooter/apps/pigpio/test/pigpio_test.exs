defmodule PigpioTest do
  use ExUnit.Case
  doctest Pigpio

  test "greets the world" do
    assert Pigpio.hello() == :world
  end
end
