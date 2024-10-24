import type { vNode } from "./parser.ts";

const Nodes = {
  CharacterBody2D: (defaultProps, props) => {
    defaultProps.addPart(
      "nodes",
      `[node name="${defaultProps.name}" type="CharacterBody2D"${
        !defaultProps.isRoot ? ` parent="${defaultProps.parent}"` : ""
      }]`
    );

    addTypicalProps(props, defaultProps.addPart);
  },
  CollisionShape2D: (defaultProps, props) => {
    defaultProps.addPart(
      "nodes",
      `[node name="${defaultProps.name}" type="CollisionShape2D"${
        !defaultProps.isRoot ? ` parent="${defaultProps.parent}"` : ""
      }]`
    );

    if (props.shape) {
      const shapeId = crypto.randomUUID();
      let shape = "";
      switch (props.shape) {
        case "rect":
          shape = "RectangleShape2D";
          break;
        case "circle":
          shape = "CircleShape2D";
          break;
      }
      defaultProps.addPart(
        "internal",
        `[sub_resource type="${shape}" id="${shapeId}"]`
      );
      defaultProps.addPart("nodes", `shape = SubResource("${shapeId}")`);
      delete props.shape;
    }

    addTypicalProps(props, defaultProps.addPart);
  },
} satisfies Record<
  string,
  (
    defaultProps: {
      isRoot: boolean;
      parent?: string;
      name: string;
      addPart: (category: string, part: string) => void;
    },
    props: vNode["props"]
  ) => void
>;

export default Nodes;
export const NodeTypes = typeof Nodes;

function addTypicalProps(
  props: vNode["props"],
  addPart: (category: string, part: string) => void
) {
  return Object.entries(props).map(([key, value]) => {
    if (key === "children") return;
    switch (key) {
      case "script": {
        const scriptId = crypto.randomUUID();
        addPart(
          "external",
          `[ext_resource type="Script" path="${value}" id="${scriptId}"]`
        );
        addPart("nodes", `script = ExtResource("${scriptId}")`);
        break;
      }
      default: {
        if (typeof value === "string") {
          value = checkTypeSignals(value);
        }
        addPart("nodes", `${key} = ${value}`);
        break;
      }
    }
  });
}

function checkTypeSignals(input: string) {
  const vector2Match = input.match(/V2 ([0-9]+), ([0-9]+)/);
  const vector3Match = input.match(/V3 ([0-9]+), ([0-9]+), ([0-9]+)/);
  if (vector2Match) {
    return `Vector2(${vector2Match[1]}, ${vector2Match[2]})`;
  } else if (vector3Match) {
    return `Vector3(${(vector3Match[1], vector3Match[2], vector3Match[3])})`;
  } else {
    return input;
  }
}
