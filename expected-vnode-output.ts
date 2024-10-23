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
            width: 2,
            height: 3,
            disabled: true,
          },
        },
      ],
    },
  },
} satisfies { nodeName: string; root: vNode };
