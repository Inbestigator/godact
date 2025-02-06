import { createGodactScene, Node2D } from "@gdx/godact";
import Player from "./player.tsx";
import Floor from "./floor.tsx";

function MainScene() {
  return (
    <Node2D name="MainScene">
      <Player />
      <Floor />
    </Node2D>
  );
}

createGodactScene(<MainScene />, "./dist/main.tscn");
