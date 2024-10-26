// @ts-types="@types/react"
// deno-lint-ignore verbatim-module-syntax
import _React from "react";

/**
 * Convert a React component to a Godot scene.
 *
 * @example
 * ```tsx
 * import { createGodactScene } from "@inbestigator/godact";
 *
 * function Player() {
 *   return (
 *     <CharacterBody2D name="Player">
 *       <CollisionShape2D
 *         shape={createRectangleShape2D({ size: [1, 1] })}
 *       />
 *     </CharacterBody2D>
 *   );
 * }
 *
 * createGodactScene(<Player />, "./scenes/player.tscn");
 * ```
 *
 * @module
 */

export * from "./core/nodes/collision-shape-2d.tsx";
export * from "./core/nodes/physics/character-body-2d.tsx";
export * from "./core/resources/shapes/rectangle-shape-2d.ts";
export * from "./core/godact.ts";
