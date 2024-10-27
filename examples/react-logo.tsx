import {
  Color,
  createGodactScene,
  Line2D,
  Node2D,
  PackedArray,
  Vector2,
  type Vector2Type,
} from "@inbestigator/godact";

function ReactLogo() {
  const color = Color(97, 218, 251, 255);
  const center = Vector2(576, 324);
  const ellipseRadius = Vector2(180, 60);
  const ellipseAngle = Math.PI / 3;
  const numPoints = 100;

  function createPoints(
    center: Vector2Type,
    radius: Vector2Type,
    rotation: number,
  ) {
    const points = [];
    for (let i = 0; i <= numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const x = center.x + radius.x * Math.cos(angle) * Math.cos(rotation) -
        radius.y * Math.sin(angle) * Math.sin(rotation);
      const y = center.y + radius.x * Math.cos(angle) * Math.sin(rotation) +
        radius.y * Math.sin(angle) * Math.cos(rotation);
      points.push(Vector2(x, y));
    }
    return points;
  }

  const centerCirclePoints = createPoints(
    center,
    Vector2(20, 20),
    0,
  );

  return (
    <Node2D name="ReactLogo">
      <Line2D
        name="Center"
        points={PackedArray<Vector2Type>(...centerCirclePoints)}
        width={4}
        default_color={color}
      />
      {[1, 2, 3].map((
        i,
      ) => {
        const points = createPoints(
          center,
          ellipseRadius,
          (i - 1) * ellipseAngle,
        );

        return (
          <Line2D
            name={`Ellipse ${i}`}
            key={`Ellipse ${i}`}
            points={PackedArray<Vector2Type>(...points)}
            width={4}
            default_color={color}
          />
        );
      })}
    </Node2D>
  );
}

createGodactScene(<ReactLogo />, "./examples/react-logo.tscn");
