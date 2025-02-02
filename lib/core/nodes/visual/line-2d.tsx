import type { ReactNode } from "types/react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import {
  addCommonProps,
  addNodeEntry,
  createId,
} from "../../../internal/helpers.ts";
import type {
  ColorType,
  Curve,
  Gradient,
  Node2DProps,
  PackedArrayType,
  Vector2Type,
} from "@inbestigator/godact";

/**
 * Props for a Line2D
 *
 * @category Visual
 */
export interface Line2DProps extends Node2DProps {
  antialiased?: boolean;
  begin_cap_mode?: 0 | 1 | 2;
  closed?: boolean;
  default_color?: ColorType;
  end_cap_mode?: 0 | 1 | 2;
  gradient?: Gradient;
  joint_mode?: 0 | 1 | 2;
  points?: PackedArrayType<Vector2Type>;
  round_precision?: number;
  sharp_limit?: number;
  width?: number;
  width_curve?: Curve;
}

/**
 * A 2D polyline that can optionally be textured.
 *
 * @example
 * ```tsx
 * <Line2D />
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_line2d.html
 */
export function Line2D(props: Line2DProps): ReactNode {
  return (
    <GodotNode props={props} createNode={() => createLine2DNode(props)}>
      {props.children}
    </GodotNode>
  );
}

function createLine2DNode(props: Line2DProps): Node<Line2DProps> {
  const node = createNode<Line2DProps>(props);
  const resourceIds = new Array(100).fill(createId());
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "Line2D",
        name: nodeName,
        parent,
        props: {
          ...props,
          ...(props.gradient &&
            {
              gradient: {
                typeSpecifier: "SubResource",
                value: `"${resourceIds[0]}"`,
              },
            }),
          ...(props.width_curve &&
            {
              width_curve: {
                typeSpecifier: "SubResource",
                value: `"${resourceIds[1]}"`,
              },
            }),
        },
        script,
      });

      if (props.gradient) {
        script.internal.push({
          text: `[sub_resource type="${props.gradient.type}" id="${
            resourceIds[0]
          }"]`,
          props: addCommonProps({ ...props.gradient.props }, script),
        });
      }
      if (props.width_curve) {
        script.internal.push({
          text: `[sub_resource type="${props.width_curve.type}" id="${
            resourceIds[1]
          }"]`,
          props: addCommonProps({ ...props.width_curve.props }, script),
        });
      }

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}
