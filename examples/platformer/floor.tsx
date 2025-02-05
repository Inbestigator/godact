import {
  CollisionShape2D,
  createRectangleShape2D,
  createTexture2D,
  Sprite2D,
  StaticBody2D,
  Vector2,
} from "@inbestigator/godact";

export default function Floor() {
  return (
    <StaticBody2D
      scale={Vector2(18, 1)}
      position={Vector2(576, 615)}
      name="Floor"
    >
      <CollisionShape2D
        name="CollisionShape2D"
        shape={createRectangleShape2D(Vector2(64, 64))}
      />
      <Sprite2D
        name="Sprite2D"
        texture={createTexture2D("res://icon.svg")}
        scale={Vector2(0.5, 0.5)}
      />
    </StaticBody2D>
  );
}
