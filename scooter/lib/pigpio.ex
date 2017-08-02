defmodule Pigpio do

  def init() do
    io = Port.open '/dev/pigpio', [:eof]
    Process.register io, :pigpio

    out = Port.open '/dev/pigout', [:eof]
    Process.put :pigout,out
  end

  def call(command) do
    out = Process.get(:pigout)
    send(:pigpio, {self(), {:command, command <> "\n"}})
    receive do
      {out, {:data, '0\n'}} -> 
        :ok
      {out, {:data, errcode}} ->
        {:error, chars_to_integer(errcode)}
    after 0_500 ->
      :timeout
    end
  end

  defp chars_to_integer(chars) do
    String.to_integer(String.trim(to_string(chars)))
  end
end
