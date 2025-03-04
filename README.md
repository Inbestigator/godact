# Godact

Convert React components to Godot scenes and transpile Typescript/Javascript
code to GDScript.

You can now make an entire Godot game without touching the Godot editor, other
than to run it! https://github.com/Inbestigator/flappy-bird

Due to the sheer number of Godot nodes (>200)

- **By request**: If you really want a specific node, you can either add it in,
  or request it
  > To request a node, please open an
  > [issue](https://github.com/inbestigator/godact/issues/new) with the label
  > `node request`
- **Others**: The rest of the registry will slowly be filled in

```tsx
import {
  CharacterBody2D,
  CollisionShape2D,
  createCircleShape2D,
  createGodactScene,
  createTexture2D,
  Sprite2D,
} from "@gdx/godact";

function Player() {
  return (
    <CharacterBody2D script="./player.ts" name="Player">
      <Sprite2D
        name="Sprite2D"
        texture={createTexture2D({ path: "res://icon.svg" })}
      />
      <CollisionShape2D shape={createCircleShape2D()} />
    </CharacterBody2D>
  );
}

createGodactScene(<Player />, "./player.tscn");
```

<details>

<summary>Player logic</summary>

```ts
// player.ts
"extends CharacterBody2D";

import { GDMethods } from "@gdx/godact/methods";

const SPEED = 300.0;
const JUMP_VELOCITY = -400.0;

export function _physics_process(delta: number) {
  if (!GDMethods.is_on_floor()) {
    GDMethods.velocity = GDMethods.Vector2(
      GDMethods.get_gravity().x * delta,
      GDMethods.get_gravity().y * delta,
    );
  }

  if (
    GDMethods.Input.is_action_just_pressed("ui_accept") &&
    GDMethods.is_on_floor()
  ) {
    GDMethods.velocity.y = JUMP_VELOCITY;
  }

  const direction = GDMethods.Input.get_axis("ui_left", "ui_right");
  if (direction) {
    GDMethods.velocity.x = direction * SPEED;
  } else {
    GDMethods.velocity.x = GDMethods.move_toward(
      GDMethods.velocity.x,
      0,
      SPEED * delta * (GDMethods.is_on_floor() ? 2 : 1),
    );
  }

  GDMethods.move_and_slide();
}
```

<details>

<summary>Transpiled GDScript code</summary>

```ts
extends CharacterBody2D
var SPEED = 300
var JUMP_VELOCITY = -400
func _physics_process(delta):
    if !is_on_floor():
        velocity = Vector2(get_gravity().x * delta, get_gravity().y * delta)
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY
    var direction = Input.get_axis("ui_left", "ui_right")
    if direction:
        velocity.x = direction * SPEED
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED * delta * (2 if is_on_floor() else 1))
    move_and_slide()
```

</details>

</details>

Component status:

- 1: Component created
- 2: Started implementing props
- 3: Minimal props in
- 4: Ready
- 5: Exported and available in lib

| Node             | Category  | Component status | Props todo    |
| ---------------- | --------- | ---------------- | ------------- |
| Node             | Base      | N/A              | `multiplayer` |
| CanvasItem       | Base      | N/A              |               |
| Node2D           | Primitive | 5                |               |
| Control          | Primitive | 5                |               |
| TileMapLayer     | Visual    | 5                |               |
| Sprite2D         | Visual    | 5                |               |
| Line2D           | Visual    | 5                |               |
| AnimatedSprite2D | Visual    | 5                |               |
| Camera2D         | Visual    | 5                |               |
| CollisionShape2D | Physics   | 5                |               |
| CharacterBody2D  | Physics   | 5                |               |
| RigidBody2D      | Physics   | 5                |               |
| StaticBody2D     | Physics   | 5                |               |
| AnimatableBody2D | Physics   | 5                |               |
| Area2D           | Physics   | 5                |               |
| PhysicalBone2D   | Physics   | 5                |               |
| Button           | Controls  | 3, 5             | `shortcut`    |
| TextEdit         | Controls  | 5                |               |
| Label            | Controls  | 5                |               |
