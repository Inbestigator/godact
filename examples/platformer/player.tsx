import {
  Camera2D,
  CharacterBody2D,
  CollisionShape2D,
  createRectangleShape2D,
  createTexture2D,
  Sprite2D,
  Vector2,
} from "@inbestigator/godact";

export default function Player() {
  return (
    <CharacterBody2D
      name="Player"
      position={Vector2(64, 64)}
      script="./player.ts"
    >
      <Sprite2D
        name="Sprite2D"
        texture={createTexture2D({ path: "res://icon.svg" })}
      />
      <CollisionShape2D
        name="CollisionShape2D"
        shape={createRectangleShape2D({ size: Vector2(128, 128) })}
      />
      <Camera2D name="Camera2D" />
    </CharacterBody2D>
  );
}
