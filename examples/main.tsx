import { Node2D } from "@inbestigator/godact";
import Player from "./player.tsx";

export default function MainScene() {
  return (
    <Node2D name="MainScene">
      <Player />
    </Node2D>
  );
}
