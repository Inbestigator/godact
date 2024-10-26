import { reconciler } from "./lib/internal/reconciler.ts";
import { createRenderer } from "./lib/internal/renderers/renderer.ts";
import SimpleScene, { expectedSimpleScene } from "./tests/simple-scene.tsx";
import { assertEquals } from "@std/assert";

Deno.test("Render a simple scene", () => {
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
    null,
  );

  reconciler.updateContainer(<SimpleScene />, root, null);

  assertEquals(container.compileScript(), expectedSimpleScene);
});
