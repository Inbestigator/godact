import {
  createGodactScene,
  createLabelSettings,
  Label,
  Node2D,
} from "@inbestigator/godact";
import Player from "./player.tsx";
import Floor from "./floor.tsx";
import { createFont } from "../../lib/core/resources/font.ts";

function MainScene() {
  return (
    <Node2D name="MainScene">
      <Player />
      <Floor />
      <Label
        text="Hello World"
        tab_stops={[0, 100, 200]}
        label_settings={createLabelSettings({
          font: createFont("res://myfont.tres"),
        })}
      />
    </Node2D>
  );
}

createGodactScene(<MainScene />, "./dist/main.tscn");
