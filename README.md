# Godact

Convert a React component to a Godot scene.

```tsx
import { CharacterBody2D, CollisionShape2D } from "@inbestigator/godact/nodes";
import { createCircleShape2D } from "@inbestigator/godact/resources";

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

| Node             | Category | Component status | Props todo     |
| ---------------- | -------- | ---------------- | -------------- |
| Node             | Base     | N/A              | `multiplayer`, |
| CanvasItemProps  | Base     | N/A              | `material`     |
| Node2D           | Org      | 5                |                |
| CollisionShape2D | Physics  | 5                |                |
| CharacterBody2D  | Physics  | 5                |                |
| RigidBody2D      | Physics  | 5                |                |
