defmodule Scooter.HW do
  use GenServer

  # Client API
  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, nil, name: :pigpio)
  end

  def set_high(pin) do
    GenServer.call(:pigpio, {:set, pin})
  end

  def set_low(pin) do
    GenServer.call(:pigpio, {:clear, pin})
  end

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


  # Server callbacks

  def init(_) do 
    io  = Port.open '/dev/pigpio', [:eof] 
    out = Port.open '/dev/pigout', [:eof]
    {:ok, {io, out}}
  end

  def handle_call({:set, pin}, _, {io, _} = state) do
    Port.command io, "w " <> to_string(pin) <> " 1\n"
    {:reply, :ok, state}
  end

  def handle_call({:clear,  pin}, _, {io, _} = state) do
    Port.command io, "w " <> to_string(pin) <> " 0\n"
    {:reply, :ok, state}
  end

  def handle_info({_, {:data, '0\n'}}, state) do
    {:noreply, state}
  end

  def handle_info({io, _}, {io, _}=state) do
    {:noreply, state}
  end

  def handle_info(payload,  state) do
    IO.inspect state
    IO.inspect payload
    {:noreply, state}
  end

end

