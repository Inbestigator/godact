import { assertEquals } from "@std/assert";
import { extractNodes } from "./parser.ts";
import expectedVNodeOutput from "./expected-vnode-output.ts";
// import expectedSceneOutput from "./expected-scene-output.tscn"

const extractedPlayer = await extractNodes("./examples/player.gdx");

Deno.test(function createVNode() {
  assertEquals(expectedVNodeOutput, extractedPlayer);
});

// Deno.test(function createScene() {
//   extractedPlayer
// });
