# Godact

Convert a React component to a Godot scene.

```tsx
import { createGodactScene } from "@inbestigator/godact";

function Player() {
  return (
    <CharacterBody2D name="Player">
      <CollisionShape2D shape={createRectangleShape2D({ size: [1, 1] })} />
    </CharacterBody2D>
  );
}

createGodactScene(<Player />, "./player.tscn");
```
