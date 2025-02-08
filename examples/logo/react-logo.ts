"extends Node2D";

import { GlobalMethods } from "@gdx/godact/methods";

let processCount = 0;
let currentIndex = 1;

export function _process(delta: number) {
  processCount += 1;
  GlobalMethods.rotation += delta / 5;
  if (
    processCount >= 4 &&
    currentIndex < GlobalMethods.get_child(1).get_child_count()
  ) {
    processCount = 0;
    setVisible(currentIndex);
    currentIndex += 1;
  }
}

function setVisible(i: number) {
  GlobalMethods.get_child(1).get_child(i).visible = true;
  GlobalMethods.get_child(2).get_child(i).visible = true;
  GlobalMethods.get_child(3).get_child(i).visible = true;
}
