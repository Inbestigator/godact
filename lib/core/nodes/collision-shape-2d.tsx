import type { ReactNode } from "react";
import { GodotNode } from "../../internal/element.ts";
import { createNode, type Node } from "../../internal/node.ts";
import { type RectangleShape2D } from "../resources/shapes/rectangle-shape-2d.ts";
import { convertCommonTypes } from "../../internal/renderers/renderer.ts";

/**
 * Props for a CollisionShape2D
 *
 * @category Node2D
 */
export interface CollisionShape2DProps {
  shape: RectangleShape2D;
  position?: [number, number];
  children?: ReactNode;
  name?: string;
}

/**
 * CollisionShape2D is a 2D physics shape that can be used in 2D games.
 *
 * ```tsx
  <CollisionShape2D
    shape={createRectangleShape2D({ size: [2, 3], position: [0, 0] })}
  >
    Player
  </CollisionShape2D>
 * ```
 *
 * @category Node2D
 * @see https://docs.godotengine.org/en/stable/classes/class_collisionshape2d.html
 */
export function CollisionShape2D(props: CollisionShape2DProps) {
  return (
    <GodotNode
      props={props}
      createNode={() => createCollisionShape2DNode(props)}
    >
      {props.children}
    </GodotNode>
  );
}

function createCollisionShape2DNode(
  props: CollisionShape2DProps,
): Node<CollisionShape2DProps> {
  const node = createNode<CollisionShape2DProps>(props);
  const shapeId = crypto.randomUUID();
  const nodeName = props.name ?? crypto.randomUUID();

  return {
    ...node,
    insertMe(script, parent) {
      script.nodes.push({
        text: `[node name="${nodeName}" type="CollisionShape2D"${
          parent ? ` parent="${parent}"` : ""
        }]`,
        props: Object.entries(props).map(([key, value]) => {
          if (key === "children" || key === "name") return "";

          if (key === "shape") {
            return `shape = SubResource("${shapeId}")`;
          }

          return `${key} = ${convertCommonTypes(value)}`;
        }),
      });

      script.internal.push({
        text: `[sub_resource type="${props.shape.type}" id="${shapeId}"]`,
        props: Object.entries(props.shape.props).map(
          ([key, value]) => `${key} = ${convertCommonTypes(value)}`,
        ),
      });

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : nodeName);
      }
    },
  };
}
