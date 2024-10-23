import { assertEquals } from "@std/assert";
import { extractNodes } from "./parser.ts";
import expectedVNodeOutput from "./expected-vnode-output.json" with { type: "json" }
// import expectedSceneOutput from "./expected-scene-output.tscn"

const extractedPlayer = await extractNodes("./examples/player.gdx")

Deno.test(function createVNode() {
  assertEquals(extractedPlayer, expectedVNodeOutput);
});

// Deno.test(function createScene() {
//   extractedPlayer
// });
