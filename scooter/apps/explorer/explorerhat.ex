defmodule ExplorerHat do
    
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

end