import {
  Camera2D,
  CharacterBody2D,
  CollisionShape2D,
  createRectangleShape2D,
  createTexture2D,
  Sprite2D,
  Vector2,
} from "@gdx/godact";
import { GDMethods } from "@gdx/godact/methods";

export default function Player() {
  return (
    <CharacterBody2D
      name="Player"
      position={Vector2(64, 64)}
      onPhysicsProcess={(delta: number) => {
        const SPEED = 300.0;
        const JUMP_VELOCITY = -400.0;

        // Add the gravity.
        if (!GDMethods.is_on_floor()) {
          GDMethods.velocity = GDMethods.Vector2(
            GDMethods.get_gravity().x * delta,
            GDMethods.get_gravity().y * delta,
          );
        }

        // Handle jump.
        if (
          GDMethods.Input.is_action_just_pressed("ui_accept") &&
          GDMethods.is_on_floor()
        ) {
          GDMethods.velocity.y = JUMP_VELOCITY;
        }

        // Get the input direction and handle the movement/deceleration.
        // As good practice, you should replace UI actions with custom gameplay actions.
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
      }}
    >
      <Sprite2D name="Sprite2D" texture={createTexture2D("res://icon.svg")} />
      <CollisionShape2D
        name="CollisionShape2D"
        shape={createRectangleShape2D(Vector2(128, 128))}
      />
      <Camera2D name="Camera2D" />
    </CharacterBody2D>
  );
}
