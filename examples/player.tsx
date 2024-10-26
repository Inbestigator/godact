import {
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
      editor_description="This is an example player, will become more complex as the nodes are implemented"
    >
      <Sprite2D texture={createTexture2D({ path: "res://icon.svg" })} />
      <CollisionShape2D
        shape={createRectangleShape2D({ size: Vector2(128, 128) })}
      />
    </CharacterBody2D>
  );
}
