import type { ReactNode } from "react";
import { GodotNode } from "../../../internal/element.ts";
import { Node } from "../../../internal/node.ts";

/**
 * Props for a 2D character body
 *
 * @category Character
 */
export interface CharacterBody2DProps {
  children?: ReactNode;
}

/**
 * CharacterBody2D is a 2D physics body. You can mainly use it to make your player.
 *
 * ```tsx
  <CharacterBody2D>
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
    <GodotNode props={props} createNode={() => new CharacterBody2DNode(props)}>
      {props.children}
    </GodotNode>
  );
}

class CharacterBody2DNode extends Node<CharacterBody2DProps> {}
