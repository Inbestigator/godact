import {
  CharacterBody2D,
  CollisionShape2D,
  createRectangleShape2D,
  createTexture2D,
  Node2D,
  Sprite2D,
  StaticBody2D,
  Vector2,
} from "@inbestigator/godact";
import { createRenderer } from "../lib/internal/renderer.ts";
import { reconciler } from "../lib/internal/reconciler.ts";
import { assertEquals } from "@std/assert";

Deno.test("Render a simple scene", () => {
  crypto.randomUUID = () => "00000000-0000-0000-0000-000000000000";
  const container = createRenderer();

  const root = reconciler.createContainer(
    container,
    0,
    null,
    false,
    null,
    "godact",
    (error: Error) => console.error(error),
    null,
  );

  reconciler.updateContainer(<SimpleScene />, root, null);

  assertEquals(container.compileScript(), expectedSimpleScene);
});

function SimpleScene() {
  return (
    <Node2D name="SimpleScene">
      <Player />
      <Floor />
    </Node2D>
  );
}

function Player() {
  return (
    <CharacterBody2D name="Player" position={Vector2(64, 64)}>
      <Sprite2D
        name="Sprite2D"
        texture={createTexture2D("res://icon.svg")}
      />
      <CollisionShape2D
        name="CollisionShape2D"
        shape={createRectangleShape2D({ size: Vector2(128, 128) })}
      />
    </CharacterBody2D>
  );
}

function Floor() {
  return (
    <StaticBody2D
      scale={Vector2(18, 1)}
      position={Vector2(576, 615)}
      name="Floor"
    >
      <CollisionShape2D
        name="CollisionShape2D"
        shape={createRectangleShape2D({ size: Vector2(64, 64) })}
      />
      <Sprite2D
        name="Sprite2D"
        texture={createTexture2D("res://icon.svg")}
        scale={Vector2(0.5, 0.5)}
      />
    </StaticBody2D>
  );
}

export const expectedSimpleScene = `[gd_scene format=3]
[ext_resource type="Texture2D" id="139c80fb" path="res://icon.svg"]
[sub_resource type="RectangleShape2D" id="abac4573"]
size = Vector2(128, 128)
[sub_resource type="RectangleShape2D" id="7b68d7e2"]
size = Vector2(64, 64)
[node type="Node2D" name="SimpleScene"]
[node type="CharacterBody2D" name="Player" parent="."]
position = Vector2(64, 64)
[node type="Sprite2D" name="Sprite2D" parent="./Player"]
texture = ExtResource("139c80fb")
[node type="CollisionShape2D" name="CollisionShape2D" parent="./Player"]
shape = SubResource("abac4573")
[node type="StaticBody2D" name="Floor" parent="."]
scale = Vector2(18, 1)
position = Vector2(576, 615)
[node type="CollisionShape2D" name="CollisionShape2D" parent="./Floor"]
shape = SubResource("7b68d7e2")
[node type="Sprite2D" name="Sprite2D" parent="./Floor"]
texture = ExtResource("139c80fb")
scale = Vector2(0.5, 0.5)
`;
