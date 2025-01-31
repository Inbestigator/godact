"extends CharacterBody2D";

// deno-lint-ignore no-explicit-any
const Godot: any = null;

const SPEED = 300.0;
const JUMP_VELOCITY = -400.0;

export function _physics_process(delta: number) {
  // Add the gravity.
  if (!Godot.is_on_floor()) {
    Godot.velocity += Godot.get_gravity() * delta;
  }

  // Handle jump.
  if (Godot.Input.is_action_just_pressed("ui_accept") && Godot.is_on_floor()) {
    Godot.velocity.y = JUMP_VELOCITY;
  }

  // Get the input direction and handle the movement/deceleration.
  // As good practice, you should replace UI actions with custom gameplay actions.
  const direction = Godot.Input.get_axis("ui_left", "ui_right");
  if (direction) {
    Godot.velocity.x = direction * SPEED;
  } else {
    Godot.velocity.x = Godot.move_toward(
      Godot.velocity.x,
      0,
      SPEED * delta * (Godot.is_on_floor() ? 2 : 1),
    );
  }

  Godot.move_and_slide();
}
