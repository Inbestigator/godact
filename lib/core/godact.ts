// @ts-types="@types/react"
import type { ReactNode } from "react";
import { reconciler } from "../internal/reconciler.ts";
import { createRenderer } from "../internal/renderers/renderer.ts";
import { writeFileSync } from "node:fs";

/**
 * Create a Godot scene from a React component.
 *
 * @example
 * ```tsx
 * createGodactScene(<Player />, "./player.tscn");
 * ```
 *
 * @param component React component to render
 * @param out Path to output file
 */
export function createGodactScene(component: ReactNode, out: string) {
  const container = createRenderer();

  const root = reconciler.createContainer(
    container,
    0,
    null,
    false,
    null,
    "godact",
    (error: Error) => console.error(error),
    null,
  );

  if (root !== null) {
    reconciler.updateContainer(component, root, null);

    writeFileSync(out, new TextEncoder().encode(container.compileScript()));
  }
}
