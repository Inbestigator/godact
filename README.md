# Godact

Convert React components to Godot scenes.

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
} from "@inbestigator/godact";

function Player() {
  return (
    <CharacterBody2D name="Player">
      <CollisionShape2D shape={createCircleShape2D()} />
    </CharacterBody2D>
  );
}

createGodactScene(<Player />, "./player.tscn");
```

Component status:

- 1: Component created
- 2: Started implementing props
- 3: Minimal props in
- 4: Ready
- 5: Exported and available in lib

| Node             | Category | Component status | Props todo    |
| ---------------- | -------- | ---------------- | ------------- |
| Node             | Base     | N/A              | `multiplayer` |
| CanvasItem       | Base     | N/A              |               |
| Node2D           | Org      | 5                |               |
| TileMapLayer     | Visual   | 5                |               |
| Sprite2D         | Visual   | 5                |               |
| Line2D           | Visual   | 5                |               |
| AnimatedSprite2D | Visual   | 5                |               |
| Camera2D         | Visual   | 5                |               |
| CollisionShape2D | Physics  | 5                |               |
| CharacterBody2D  | Physics  | 5                |               |
| RigidBody2D      | Physics  | 5                |               |
| StaticBody2D     | Physics  | 5                |               |
| AnimatableBody2D | Physics  | 5                |               |
| Area2D           | Physics  | 5                |               |
