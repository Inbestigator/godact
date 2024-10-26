import {
  CharacterBody2D,
  CollisionShape2D,
  Sprite2D,
} from "@inbestigator/godact/nodes";
import {
  createRectangleShape2D,
  createTexture2D,
} from "@inbestigator/godact/resources";
import { Vector2 } from "@inbestigator/godact/types";

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
