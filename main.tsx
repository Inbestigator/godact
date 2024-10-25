import Player from "./examples/player.tsx";
import { reconciler } from "./lib/internal/reconciler.ts";
import { createRenderer } from "./lib/internal/renderers/renderer.ts";
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
  reconciler.updateContainer(<Player />, root, null);
}
