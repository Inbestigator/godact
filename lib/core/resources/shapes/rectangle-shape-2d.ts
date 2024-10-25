import type { Shape2DProps } from "./shape-2d.ts";

export interface RectangleShape2D {
  type: "RectangleShape2D";
  props: RectangleShape2DProps;
}

export interface RectangleShape2DProps extends Shape2DProps {}

export function createRectangleShape2D(
  props: RectangleShape2DProps,
): RectangleShape2D {
  return {
    type: "RectangleShape2D",
    props,
  };
}
