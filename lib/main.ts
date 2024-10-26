/**
 * Convert a React component to a Godot scene.
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
export * from "./core/nodes/node-2d.tsx";
export * from "./core/nodes/sprite-2d.tsx";

export * from "./core/nodes/collision-shape-2d.tsx";

export * from "./core/nodes/physics/character-body-2d.tsx";
export * from "./core/nodes/physics/rigid-body-2d.tsx";

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

export * from "./core/resources/texture-2d.ts";

// Types
export * from "./core/types/vectors.ts";
