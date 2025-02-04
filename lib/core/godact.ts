import type { ReactNode } from "types/react";
import { reconciler } from "../internal/reconciler.ts";
import { createRenderer } from "../internal/renderer.ts";
import fs from "node:fs";

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
  const container = createRenderer(out);

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

    fs.mkdirSync(out.split("/").slice(0, -1).join("/"), { recursive: true });

    fs.writeFileSync(
      out,
      container.compileScript(),
    );
  }
}
