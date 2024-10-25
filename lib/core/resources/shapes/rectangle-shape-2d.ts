import type { Shape2DProps } from "./shape-2d.ts";

export interface RectangleShape2DProps extends Shape2DProps {}

export function RectangleShape2D(props: RectangleShape2DProps) {
  return {
    type: "RectangleShape2D",
    props,
  };
}
