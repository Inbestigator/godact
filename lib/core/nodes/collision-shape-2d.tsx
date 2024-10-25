import type { ReactNode } from "react";
import { GodotNode } from "../../internal/element.ts";
import { createNode } from "../../internal/node.ts";
import { RectangleShape2D } from "../resources/shapes/rectangle-shape-2d.ts";

/**
 * Props for a CollisionShape2D
 *
 * @category Node2D
 */
export interface CollisionShape2DProps {
  shape: ReturnType<typeof RectangleShape2D>;
  children?: ReactNode;
}

/**
 * CollisionShape2D is a 2D physics shape that can be used in 2D games.
 *
 * ```tsx
  <CollisionShape2D
    shape={RectangleShape2D({ size: [2, 3], position: [0, 0] })}
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

function createCollisionShape2DNode(props: CollisionShape2DProps) {
  return createNode<CollisionShape2DProps>(props);
}
