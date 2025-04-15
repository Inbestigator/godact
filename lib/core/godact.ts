import type { ReactNode } from "types/react";
import { reconciler } from "../internal/reconciler.ts";
import { createRenderer } from "../internal/renderer.ts";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createId } from "../internal/helpers.ts";
import { join } from "node:path";

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
  try {
    rmSync(
      join(out.split("/").slice(0, -1).join("/"), "gdx-" + createId(out)),
      {
        recursive: true,
      },
    );
  } catch {
    // pass
  }
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

    mkdirSync(out.split("/").slice(0, -1).join("/"), { recursive: true });

    writeFileSync(
      out,
      container.compileScript(),
    );
  }
}
