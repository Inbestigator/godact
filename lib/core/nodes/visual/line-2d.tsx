// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import {
  addCommonProps,
  addNodeEntry,
  createId,
} from "../../../internal/helpers.ts";
import type { Node2DProps } from "../node-2d.tsx";
import type { ColorType, Vector2Type } from "../../types/vectors.ts";
import type { PackedArray } from "../../types/packed-array.ts";
import type { Gradient } from "../../resources/gradient.ts";
import type { Curve } from "../../resources/curve.ts";

React.version; // Purely linter fix, remove once import React doesn't cause no-unused-vars and verbatim-module-syntax

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
  points?: PackedArray<Vector2Type>;
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
    <GodotNode
      props={props}
      createNode={() => createLine2DNode(props)}
    >
      {props.children}
    </GodotNode>
  );
}

function createLine2DNode(props: Line2DProps): Node<Line2DProps> {
  const node = createNode<Line2DProps>(props);
  const gradientId = createId();
  const curveId = createId();
  const nodeName = props.name ?? createId();

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "Line2D",
        name: nodeName,
        parent,
        props: {
          ...props,
          ...(props.gradient && {
            gradient: {
              typeSpecifier: "SubResource",
              value: `"${gradientId}"`,
            },
          }),
          ...(props.width_curve && {
            gradient: {
              typeSpecifier: "SubResource",
              value: `"${curveId}"`,
            },
          }),
        },
        script,
      });

      if (props.gradient) {
        script.external.push({
          text: `[sub_resource type="Gradient" id="${gradientId}"]`,
          props: addCommonProps({ ...props.gradient.props }, script),
        });
      }

      if (props.width_curve) {
        script.external.push({
          text: `[sub_resource type="Curve" id="${curveId}"]`,
          props: addCommonProps(
            { ...props.width_curve.props },
            script,
          ),
        });
      }

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}
