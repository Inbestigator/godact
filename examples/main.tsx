import { Node2D } from "@inbestigator/godact";
import Player from "./player.tsx";
import Floor from "./floor.tsx";

export default function MainScene() {
  return (
    <Node2D name="MainScene">
      <Player />
      <Floor />
    </Node2D>
  );
}
