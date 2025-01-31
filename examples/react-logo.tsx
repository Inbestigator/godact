import {
  Color,
  createGodactScene,
  Line2D,
  Node2D,
  PackedArray,
  Vector2,
  type Vector2Type,
} from "@inbestigator/godact";

const createPoints = (radius: Vector2Type, rotation: number, numPoints = 101) =>
  Array.from({ length: numPoints }, (_, i) => {
    const angle = (i / 100) * 2 * Math.PI;
    const x = radius.x * Math.cos(angle) * Math.cos(rotation) -
      radius.y * Math.sin(angle) * Math.sin(rotation);
    const y = radius.x * Math.cos(angle) * Math.sin(rotation) +
      radius.y * Math.sin(angle) * Math.cos(rotation);
    return Vector2(x, y);
  });

const color = Color(97, 218, 251, 255);

function ReactLogo() {
  return (
    <Node2D
      script="./react-logo.ts"
      position={Vector2(576, 324)}
      name="ReactLogo"
    >
      <Line2D
        name="Center"
        points={PackedArray(...createPoints(Vector2(20, 20), 0))}
        width={4}
        default_color={color}
      />
      {[1, 2, 3].map((i) => (
        <Node2D name={`Ellipse ${i}`} key={i}>
          {Array.from({ length: 101 }, (_, i) => i + 1).map((j) => (
            <Line2D
              name={`Part ${j}`}
              key={j}
              points={PackedArray(
                ...createPoints(Vector2(180, 60), (i * Math.PI) / 3, j),
              )}
              width={4}
              default_color={color}
              visible={false}
            />
          ))}
        </Node2D>
      ))}
    </Node2D>
  );
}

createGodactScene(<ReactLogo />, "./react-logo.tscn");
