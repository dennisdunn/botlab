defmodule Pigpio do

  # Client API

  def start_link() do
    io  = Port.open '/dev/pigpio', [:eof]
    out = Port.open '/dev/pigout', [:eof]
    {:ok, {io, out}}
  end

  # Server callbacks
  
  def init(_) do
  end
end

