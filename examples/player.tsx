import {
  CharacterBody2D,
  CollisionShape2D,
  createRectangleShape2D,
} from "../lib/main.ts";

export default function Player() {
  return (
    <CharacterBody2D name="Player">
      <CollisionShape2D
        shape={createRectangleShape2D({ size: [2, 3] })}
        position={[1, 2]}
      />
    </CharacterBody2D>
  );
}
