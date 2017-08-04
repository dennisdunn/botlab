defmodule ExplorerTest do
  use ExUnit.Case
  doctest Explorer

  test "greets the world" do
    assert Explorer.hello() == :world
  end
end
