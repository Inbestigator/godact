import type { Texture2D } from "./texture-2d.ts";

/**
 * Returntype of createSpriteFrames
 *
 * @category Visual
 */
export interface SpriteFrames {
  type: "SpriteFrames";
  props: SpriteFramesProps[];
}

/**
 * Props for createSpriteFrames
 *
 * @category Visual
 */
export interface SpriteFramesProps {
  frames: {
    duration: number;
    texture: Texture2D;
  }[];
  loop: boolean;
  name: string;
  speed: number;
}

/**
 * Sprite frame library for AnimatedSprite2D and AnimatedSprite3D.
 *
 * @example
 * ```tsx
 * createSpriteFrames({ path: "res://icon.svg" })
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_spriteframes.html
 */
export function createSpriteFrames(props: SpriteFramesProps[]): SpriteFrames {
  return {
    type: "SpriteFrames",
    props,
  };
}
