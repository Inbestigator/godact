import { assertEquals } from "@std/assert";
import extractNodes from "./parser.ts";
import expectedParsedNodes from "./expected-parsed-nodes.ts";
import transpile from "./transpiler.ts";
import {
  expectedTranspiledScene,
  expectedVNodes,
} from "./expected-transpiled-scene.ts";
import type { ComponentData } from "./main.ts";

const extractedPlayer = await extractNodes("./examples/player.gdx");
if (!extractedPlayer) throw new Error("extractedPlayer is null");

Deno.test(function parseNodes() {
  assertEquals(extractedPlayer, expectedParsedNodes);
});

Deno.test(function transpileScene() {
  crypto.randomUUID = () => "00000000-0000-0000-0000-000000000000";

  const { nodeName, root } = extractedPlayer;
  const vNodes: Record<string, ComponentData> = {};
  vNodes[nodeName] = {
    path: "./examples/player.gdx",
    root,
  };

  assertEquals(vNodes, expectedVNodes);

  assertEquals(transpile(vNodes)[nodeName], expectedTranspiledScene);
});
