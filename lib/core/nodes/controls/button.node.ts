import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";

export default {
  name: "Button",
  extends: "BaseButtonProps",
  props: {
    alignment: "0 | 1 | 2 | 3",
    autowrap_mode: "0 | 1 | 2 | 3",
    clip_text: "boolean",
    expand_icon: "boolean",
    flat: "boolean",
    icon: "Texture2D",
    icon_alignment: "0 | 1 | 2 | 3",
    language: "string",
    text: "string",
    text_direction: "0 | 1 | 2 | 3",
    text_overrun_behavior: "0 | 1 | 2 | 3 | 4",
    vertical_icon_alignment: "0 | 1 | 2 | 3",
  },
  category: "Control",
  docs: [
    "A themed button that can contain text and an icon.",
    "",
    "@example",
    "```tsx",
    "<Button/>",
    "```",
  ],
  docsHref: "https://docs.godotengine.org/en/stable/classes/class_button.html",
  specialProps: {},
  resources: {},
} as ComponentDefinition;
