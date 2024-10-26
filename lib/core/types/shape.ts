import type { RectangleShape2D } from "../resources/shapes/rectangle-shape-2d.ts";
import type { CapsuleShape2D } from "../resources/shapes/capsule-shape-2d.ts";
import type { CircleShape2D } from "../resources/shapes/circle-shape-2d.ts";
import type { ConcavePolygonShape2D } from "../resources/shapes/concave-polygon-shape-2d.ts";
import type { ConvexPolygonShape2D } from "../resources/shapes/convex-polygon-shape-2d.ts";
import type { SegmentShape2D } from "../resources/shapes/segment-shape-2d.ts";
import type { SeparationRayShape2D } from "../resources/shapes/separation-ray-shape-2d.ts";
import type { WorldBoundaryShape2D } from "../resources/shapes/world-boundary-shape-2d.ts";

export type Shape2DTypes =
  | CapsuleShape2D
  | CircleShape2D
  | ConcavePolygonShape2D
  | ConvexPolygonShape2D
  | RectangleShape2D
  | SegmentShape2D
  | SeparationRayShape2D
  | WorldBoundaryShape2D;
