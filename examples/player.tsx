import { createCapsuleShape2D } from "../lib/core/resources/shapes/capsule-shape-2d.ts";
import {
  CharacterBody2D,
  CollisionShape2D,
  Node2D,
  Vector2,
} from "../lib/main.ts";

export default function Player() {
  return (
    <CharacterBody2D
      editor_description="This is an example player, will become more complex as the nodes are implemented"
      name="Player"
    >
      <CollisionShape2D
        shape={createCapsuleShape2D({ radius: 2 })}
        position={Vector2(1, 2)}
      />
      <Node2D>Player</Node2D>
    </CharacterBody2D>
  );
}
