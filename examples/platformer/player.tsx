import {
  Camera2D,
  CharacterBody2D,
  CollisionShape2D,
  createRectangleShape2D,
  createTexture2D,
  Sprite2D,
  Vector2,
} from "@gdx/godact";
import { GlobalMethods } from "@gdx/godact/methods";

export default function Player() {
  return (
    <CharacterBody2D
      name="Player"
      position={Vector2(64, 64)}
      onPhysicsProcess={(delta: number) => {
        const SPEED = 300.0;
        const JUMP_VELOCITY = -400.0;

        // Add the gravity.
        if (!GlobalMethods.is_on_floor()) {
          GlobalMethods.velocity += GlobalMethods.get_gravity() * delta;
        }

        // Handle jump.
        if (
          GlobalMethods.Input.is_action_just_pressed("ui_accept") &&
          GlobalMethods.is_on_floor()
        ) {
          GlobalMethods.velocity.y = JUMP_VELOCITY;
        }

        // Get the input direction and handle the movement/deceleration.
        // As good practice, you should replace UI actions with custom gameplay actions.
        const direction = GlobalMethods.Input.get_axis("ui_left", "ui_right");
        if (direction) {
          GlobalMethods.velocity.x = direction * SPEED;
        } else {
          GlobalMethods.velocity.x = GlobalMethods.move_toward(
            GlobalMethods.velocity.x,
            0,
            SPEED * delta * (GlobalMethods.is_on_floor() ? 2 : 1),
          );
        }

        GlobalMethods.move_and_slide();
      }}
    >
      <Sprite2D
        name="Sprite2D"
        texture={createTexture2D("res://icon.svg")}
      />
      <CollisionShape2D
        name="CollisionShape2D"
        shape={createRectangleShape2D(Vector2(128, 128))}
      />
      <Camera2D name="Camera2D" />
    </CharacterBody2D>
  );
}
