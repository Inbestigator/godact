import { createGodactScene, Node2D } from "@inbestigator/godact";
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

createGodactScene(<MainScene />, "./examples/main.tscn");
