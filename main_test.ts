import { assertEquals } from "@std/assert";
import { extractNodes } from "./parser.ts";

const playerOutput = {
  nodeName: "Player",
  children: {
    type: "CharacterBody2D",
    props: {
      children: [
        {
          type: "CollisionShape2D",
          props: {
            shape: "rect",
            width: 2,
            height: 3,
            disabled: true,
          },
        },
      ],
    },
  },
};

Deno.test(async function parseNodes() {
  assertEquals(await extractNodes("./examples/player.gdx"), playerOutput);
});
