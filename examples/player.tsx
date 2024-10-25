import { CharacterBody2D } from "../lib/core/nodes/physics/character-body-2d.tsx";
import { CollisionShape2D } from "../lib/core/nodes/collision-shape-2d.tsx";
import { createRectangleShape2D } from "../lib/core/resources/shapes/rectangle-shape-2d.ts";

export default function Player() {
  return (
    <CharacterBody2D>
      <CollisionShape2D
        shape={createRectangleShape2D({ size: [2, 3], position: [0, 0] })}
      >
        Player
      </CollisionShape2D>
    </CharacterBody2D>
  );
}
