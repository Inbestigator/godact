/**
 * Convert a React component to a Godot scene.
 *
 * @example
 * ```tsx
 * import { CharacterBody2D, CollisionShape2D } from "@inbestigator/godact/nodes";
 * import { createCircleShape2D } from "@inbestigator/godact/resources";
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

export * from "./core/godact.ts";
