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

Component status:

- 1: Component created
- 2: Started implementing props
- 3: Minimal props in
- 4: Ready
- 5: Exported and available in lib

| Node             | Category | Component status | Props                                                                                                                                                                                                                                                                                             | Complete |
| ---------------- | -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Node             | Base     |                  | ~~`name`~~, `multiplayer`, ~~`process_mode`~~, ~~`process_priority`~~, ~~`process_physics_priority`~~, ~~`process_thread_group`~~, ~~`group`~~, ~~`order`~~, ~~`messages`~~, ~~`physics_interpolation_mode`~~, ~~`auto_translate_mode`~~, ~~`editor_description`~~, ~~`disabled`~~                |          |
| CanvasItem       | Base     |                  | ~~`clip_children`~~, ~~`light_mask`~~, ~~`material`~~, `modulate`, `self_modulate`, `show_behind_parent`, ~~`texture_filter`~~, ~~`texture_repeat`~~, ~~`top_level`~~, ~~`use_parent_material`~~, ~~`visibility_layer`~~, ~~`visible`~~, ~~`y_sort_enabled`~~, ~~`z_as_relative`~~, ~~`z_index`~~ |          |
| Node2D           | Org      | 5                | ~~`position`~~, ~~`rotation`~~, ~~`skew`~~, ~~`scale`~~ ~~`transform`~~                                                                                                                                                                                                                           |          |
| CollisionShape2D | Physics  | 4 \| 5           | ~~`shape`~~                                                                                                                                                                                                                                                                                       |          |
| CharacterBody2D  | Physics  | 2 \| 5           | `velocity`, `collision_layer`, `collision_mask`                                                                                                                                                                                                                                                   |          |
