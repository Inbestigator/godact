# Godact

Convert a React component to a Godot scene.

```tsx
import {
  CharacterBody2D,
  CollisionShape2D,
  createCircleShape2D,
} from "@inbestigator/godact";

function Player() {
  return (
    <CharacterBody2D name="Player">
      <CollisionShape2D shape={createCircleShape2D({})} />
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

| Node             | Category | Component status | Props todo                  |
| ---------------- | -------- | ---------------- | --------------------------- |
| Node             | Base     | N/A              | `multiplayer`               |
| CanvasItem       | Base     | N/A              | `material`                  |
| Node2D           | Org      | 5                |                             |
| TileMapLayer     | Visual   | 5                | `tile_map_data`, `tile_set` |
| Sprite2D         | Visual   | 5                |                             |
| Camera2D         | Visual   | 5                | `custom_viewport`           |
| CollisionShape2D | Physics  | 5                |                             |
| CharacterBody2D  | Physics  | 5                |                             |
| RigidBody2D      | Physics  | 5                |                             |
| StaticBody2D     | Physics  | 5                |                             |
| AnimatableBody2D | Physics  | 5                |                             |
| Area2D           | Physics  | 5                |                             |
