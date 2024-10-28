/**
 * Convert a React component to a Godot scene.
 *
 * Due to the sheer number of Godot nodes (>200)
 *
 * - **By request**: If you really want a specific node, you can either add it in, or request it
 *   > To request a node, please open an [issue](https://github.com/inbestigator/godact/issues/new) with the label `node request`
 * - **Others**: The rest of the registry will slowly be filled in
 *
 * @example
 * ```tsx
 * import {
 *   CharacterBody2D,
 *   CollisionShape2D,
 *   createCircleShape2D,
 * } from "@inbestigator/godact";
 *
 * function Player() {
 *   return (
 *     <CharacterBody2D name="Player">
 *       <CollisionShape2D shape={createCircleShape2D({})} />
 *     </CharacterBody2D>
 *   );
 * }
 *
 * createGodactScene(<Player />, "./scenes/player.tscn");
 * ```
 *
 * @module
 */

// Core
export * from "./core/godact.ts";

// Nodes
export * from "./core/nodes/node.ts";
export * from "./core/nodes/node-2d.tsx";
export * from "./core/nodes/visual/sprite-2d.tsx";
export * from "./core/nodes/visual/camera-2d.tsx";
export * from "./core/nodes/visual/tile-map-layer.tsx";
export * from "./core/nodes/visual/animated-sprite-2d.tsx";

export * from "./core/nodes/visual/line-2d.tsx";

export * from "./core/nodes/collision-shape-2d.tsx";

export * from "./core/nodes/physics/physics-props.ts";
export * from "./core/nodes/physics/character-body-2d.tsx";
export * from "./core/nodes/physics/rigid-body-2d.tsx";
export * from "./core/nodes/physics/static-body-2d.tsx";
export * from "./core/nodes/physics/animatable-body-2d.tsx";
export * from "./core/nodes/physics/area-2d.tsx";

// Resources
export * from "./core/resources/physics/physics-material.ts";

export * from "./core/resources/shapes/capsule-shape-2d.ts";
export * from "./core/resources/shapes/circle-shape-2d.ts";
export * from "./core/resources/shapes/concave-polygon-shape-2d.ts";
export * from "./core/resources/shapes/convex-polygon-shape-2d.ts";
export * from "./core/resources/shapes/rectangle-shape-2d.ts";
export * from "./core/resources/shapes/segment-shape-2d.ts";
export * from "./core/resources/shapes/separation-ray-shape-2d.ts";
export * from "./core/resources/shapes/world-boundary-shape-2d.ts";

export * from "./core/resources/sprite-frames.ts";
export * from "./core/resources/texture-2d.ts";
export * from "./core/resources/gradient.ts";

// Types
export * from "./core/types/vectors.ts";
export * from "./core/types/shape.ts";
export * from "./core/types/packed-array.ts";
