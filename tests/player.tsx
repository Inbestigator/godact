import { Vector2 } from "../lib/core/types/vectors.ts";
import {
  CharacterBody2D,
  CollisionShape2D,
  createRectangleShape2D,
  createTexture2D,
  Sprite2D,
} from "../lib/main.ts";

export default function Player() {
  return (
    <CharacterBody2D name="Player">
      <Sprite2D texture={createTexture2D({ path: "res://icon.svg" })} />
      <CollisionShape2D
        shape={createRectangleShape2D({ size: Vector2(128, 128) })}
      />
    </CharacterBody2D>
  );
}

export const expectedScript = `[gd_scene format=3]
[ext_resource type="Texture2D" path="res://icon.svg" id="00000000_0000_0000_0000_000000000000"]
[sub_resource type="RectangleShape2D" id="00000000_0000_0000_0000_000000000000"]
size = Vector2(128, 128)
[node name="Player" type="CharacterBody2D"]

[node name="00000000_0000_0000_0000_000000000000" type="Sprite2D" parent="."]
texture = ExtResource("00000000_0000_0000_0000_000000000000")
[node name="00000000_0000_0000_0000_000000000000" type="CollisionShape2D" parent="."]
shape = SubResource("00000000_0000_0000_0000_000000000000")
`;
