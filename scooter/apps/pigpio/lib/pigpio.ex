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
      io: Port.open('/dev/pigpio', [:eof]),
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
Execute a pigpiod command by sending the command
the daemon via the input pipe and reading the output pipe.
If an error occurred, also read the error pipe.
"""
defp command(cmd) do
  get_port(:io)
  |> Port.command(cmd)
  out = get_port :out
  receive do
    {^out, {:data, data}} ->
      errcode = reply_to_integer data
      if errcode < 0 do
        err = get_port :err
        receive do
          {^err, {:data, msg}} ->
            {:error, errcode, msg}
        after 1_000 ->
          :timeout
        end
      else
        {:ok, errcode}
      end        
  after 1_000 ->
    :timeout
  end
end

@doc """
Get the indicated port from the agent state.
"""
defp get_port(key) do
  Agent.get __MODULE__, fn ports -> ports[key] end
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


