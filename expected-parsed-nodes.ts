import type { vNode } from "./parser.ts";

export default {
  nodeName: "Player",
  root: {
    type: "CharacterBody2D",
    props: {
      children: [
        {
          type: "CollisionShape2D",
          props: {
            shape: "rect",
            scale: "V2 2, 3",
            disabled: true,
          },
        },
      ],
      script: "res://player/player.gd",
      name: "Player",
    },
  },
} satisfies { nodeName: string; root: vNode };
