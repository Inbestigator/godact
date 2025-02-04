import type { Texture2D } from "./texture-2d.ts";

/**
 * Returntype of createSpriteFrames
 *
 * @category Visual
 */
export interface SpriteFrames {
  type: "SpriteFrames";
  props: { animations: SpriteFramesProps[] };
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
 * createSpriteFrames(
 *   {
 *     frames: [
 *       {
 *         texture: createTexture2D({ path: "res://icon.svg" }),
 *         duration: 0.5,
 *       },
 *     ],
 *     loop: true,
 *     speed: 2,
 *     name: "icon",
 *   },
 * );
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_spriteframes.html
 */
export function createSpriteFrames(
  ...props: SpriteFramesProps[]
): SpriteFrames {
  return {
    type: "SpriteFrames",
    props: { animations: props },
  };
}
