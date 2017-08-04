defmodule Scooter.HW do
  use GenServer

  # Client API

  def start_link() do
    GenServer.start_link(__MODULE__, nil, name: :pigpio)
  end

  def set_high(pin) do
    GenServer.call(:pigpio, {:set, pin})
  end

  def set_low(pin) do
    GenServer.call(:pigpio, {:clear, pin})
  end

  def pwm(pin, duty_cycle) do
    GenServer.call(:pigpio, {:pwm, pin, duty_cycle})
  end

  def read(pin) do
    GenServer.call(:pigpio, {:read, pin})
  end
   
  ## LEDs on the Explorer Hat

  def led({:on, :blue}) do
    set_high 4
  end
  def led({:off, :blue}) do
    set_low 4
  end

  def led({:on, :yellow}) do
    set_high 17
  end
  def led({:off, :yellow}) do
    set_low 17
  end

  def led({:on, :red}) do
    set_high 27
  end
  def led({:off, :red}) do
    set_low 27
  end

  def led({:on, :green}) do
    set_high 5
  end
  def led({:off, :green}) do
    set_low 5
  end

  ## Motor control on the Explorer Hat

def motor({:forward, speed}) do
  GenServer.call(:pigpio, {:pwm, 19, speed})
  GenServer.call(:pigpio, {:pwm, 21, speed}) 
end

def motor({:reverse, speed}) do
  GenServer.call(:pigpio, {:pwm, 20, speed})
  GenServer.call(:pigpio, {:pwm, 26, speed}) 
end

def stop() do
  motor({:forward, 0})
  motor({:reverse, 0})
end

# Server callbacks

def init(_) do 
  io  = Port.open '/dev/pigpio', [:eof] 
  out = Port.open '/dev/pigout', [:eof]
  {:ok, {io, out}}
end

def handle_call({:set, pin}, _, {io, _} = state) do
  Port.command io, "w #{pin} 1\n"
  {:reply, :ok, state}
end

def handle_call({:clear,  pin}, _, {io, _} = state) do
  Port.command io, "w #{pin} 0\n"
  {:reply, :ok, state}
end

def handle_call({:read,  pin}, _, {io, _} = state) do
  result = Port.command io, "r #{pin}\n"
           |> chars_to_integer
  if result < 0 do 
    {:reply, {:error, result}, state}
  else 
    {:reply, {:ok, result}, state}
  end
end


def handle_call({:pwm, pin, duty_cycle}, _, {io,_} = state) do
  Port.command io, "p #{pin} #{duty_cycle}\n"
  {:reply, :ok, state}
end

def handle_info({_, {:data, '0\n'}}, state) do
  {:noreply, state}
end

def handle_info({io, payload}, {io, _}=state) do
  IO.inspect payload
  {:noreply, state}
end

def handle_info(payload,  state) do
  IO.inspect state
  IO.inspect payload
  {:noreply, state}
end

defp chars_to_integer(chars) do
  chars
  |> to_string 
  |> String.trim
  |> String.to_integer
end

end


