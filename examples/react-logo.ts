"extends Node2D";

// deno-lint-ignore no-explicit-any
const Godot: any = null;

let processCount = 0;
let currentIndex = 1;

export function _ready() {
  setVisible(currentIndex);
}

export function _process(delta: number) {
  processCount += 1;
  Godot.rotation += delta / 5;
  if (
    processCount >= 10 && currentIndex < Godot.get_child(1).get_child_count()
  ) {
    processCount = 0;
    setVisible(currentIndex);
    currentIndex += 1;
  }
}

function setVisible(i: number) {
  Godot.get_child(1).get_child(i).visible = true;
  Godot.get_child(2).get_child(i).visible = true;
  Godot.get_child(3).get_child(i).visible = true;
}
