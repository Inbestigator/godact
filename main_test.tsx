import { reconciler } from "./lib/internal/reconciler.ts";
import { createRenderer } from "./lib/internal/renderers/renderer.ts";
import Player, { expectedScript } from "./tests/player.tsx";
import { assertEquals } from "@std/assert";

Deno.test("Test render", () => {
  crypto.randomUUID = () => "00000000-0000-0000-0000-000000000000";
  const container = createRenderer();

  const root = reconciler.createContainer(
    container,
    0,
    null,
    false,
    null,
    "godact",
    (error: Error) => console.error(error),
    null
  );

  reconciler.updateContainer(<Player />, root, null);
  assertEquals(container.compileScript(), expectedScript);
});
