defmodule Pigpio do
  use Agent

  @moduledoc """
  The module uses the pipe interface of the
  pigpiod daemon to control the GPIO pins on a 
  Raspberry Pi.
  """

  @doc """
  Start the link with the pigpio pipes.
  """
  def start_link() do
    fn -> %{
      pio: Port.open('/dev/pigpio', [:eof]),
      out: Port.open('/dev/pigout', [:eof]),
      err: Port.open('/dev/pigerr', [:eof])
    } end
    |> Agent.start_link(name: __MODULE__) 
  end

  @doc """
  Read the value of a GPIO pin.
  """
  def read(pin) do
    command "r #{pin}\n"
  end

  @doc """
  Set the value of the GPIO pin to the given value.
  """
def write(pin, level) do
  command "w #{pin} #{level}\n"
end

@doc """
Apply a PWM signal to a specified GPIO pin.
"""
def pwm(pin, duty_cycle) do
  command "p #{pin} #{duty_cycle}\n"
end


@doc """
Execute a pigpiod command by sending the command to
the daemon via the input pipe and reading the output pipe.
If an error occurred, also read the error pipe.
"""
defp command(cmd) do

   %{:pio => pio,:out => out} =
  Agent.get(__MODULE__, fn m -> m end)

  Port.connect pio, self()
  Port.connect out, self()

  Port.command pio, cmd

  receive do
    {^out, {:data, data}} ->
      exit_code = reply_to_integer data
      if exit_code >= 0 do
        {:ok, exit_code}
      else
        {:error, exit_code}
      end
  end
end

@doc """
Parse the string to an int.
"""
defp reply_to_integer(chars) do
  chars
  |> to_string
  |> String.trim
  |> String.to_integer
end  
end


