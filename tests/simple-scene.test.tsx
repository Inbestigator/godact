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
import { createRenderer } from "../lib/internal/renderers/renderer.ts";
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
    <CharacterBody2D
      name="Player"
      position={Vector2(64, 64)}
    >
      <Sprite2D
        name="Sprite2D"
        texture={createTexture2D({ path: "res://icon.svg" })}
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
        texture={createTexture2D({ path: "res://icon.svg" })}
        scale={Vector2(0.5, 0.5)}
      />
    </StaticBody2D>
  );
}

export const expectedSimpleScene = `[gd_scene format=3]
[ext_resource type="Texture2D" path="res://icon.svg" id="00000000_0000_0000_0000_000000000000"]
[ext_resource type="Texture2D" path="res://icon.svg" id="00000000_0000_0000_0000_000000000000"]
[sub_resource type="RectangleShape2D" id="00000000_0000_0000_0000_000000000000"]
size = Vector2(128, 128)
[sub_resource type="RectangleShape2D" id="00000000_0000_0000_0000_000000000000"]
size = Vector2(64, 64)
[node name="SimpleScene" type="Node2D"]

[node name="Player" type="CharacterBody2D" parent="."]
position = Vector2(64, 64)
[node name="Sprite2D" type="Sprite2D" parent="./Player"]
texture = ExtResource("00000000_0000_0000_0000_000000000000")
[node name="CollisionShape2D" type="CollisionShape2D" parent="./Player"]
shape = SubResource("00000000_0000_0000_0000_000000000000")
[node name="Floor" type="StaticBody2D" parent="."]
scale = Vector2(18, 1)
position = Vector2(576, 615)
[node name="CollisionShape2D" type="CollisionShape2D" parent="./Floor"]
shape = SubResource("00000000_0000_0000_0000_000000000000")
[node name="Sprite2D" type="Sprite2D" parent="./Floor"]
texture = ExtResource("00000000_0000_0000_0000_000000000000")
scale = Vector2(0.5, 0.5)
`;
