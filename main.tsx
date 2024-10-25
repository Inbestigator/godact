import Player from "./examples/player.tsx";
import { reconciler } from "./lib/internal/reconciler.ts";
import { Renderer } from "./lib/internal/renderers/renderer.ts";
const container = new Renderer();

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

if (root !== null) {
  reconciler.updateContainer(<Player />, root, null);
}
