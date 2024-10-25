import type { ReactNode } from "react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { convertCommonTypes } from "../../../internal/renderers/renderer.ts";

/**
 * Props for a CharacterBody2D
 *
 * @category PhysicsBody2D
 */
export interface CharacterBody2DProps {
  children?: ReactNode;
  name?: string;
}

/**
 * CharacterBody2D is a 2D physics body. You can mainly use it to make your player.
 *
 * ```tsx
  <CharacterBody2D name="Player">
    <CollisionShape2D
      shape={RectangleShape2D({ size: [2, 3], position: [0, 0] })}
    >
      Player
    </CollisionShape2D>
  </CharacterBody2D>
 * ```
 *
 * @category PhysicsBody2D
 * @see https://docs.godotengine.org/en/stable/classes/class_characterbody2d.html
 */
export function CharacterBody2D(props: CharacterBody2DProps) {
  return (
    <GodotNode
      props={props}
      createNode={() => createCharacterBody2DNode(props)}
    >
      {props.children}
    </GodotNode>
  );
}

function createCharacterBody2DNode(
  props: CharacterBody2DProps
): Node<CharacterBody2DProps> {
  const node = createNode<CharacterBody2DProps>(props);
  const nodeName = props.name ?? crypto.randomUUID();

  return {
    ...node,
    insertMe(script, parent) {
      script.nodes.push({
        text: `[node name="${nodeName}" type="CharacterBody2D"${
          parent ? ` parent="${parent}"` : ""
        }]`,
        props: Object.entries(props).map(([key, value]) => {
          if (key === "children" || key === "name") return "";
          return `${key} = ${convertCommonTypes(value)}`;
        }),
      });

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}
