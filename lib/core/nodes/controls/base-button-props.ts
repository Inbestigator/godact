import type { Shortcut } from "../../resources/shortcut.ts";
import type { BitFieldType } from "../../types/bitfield.ts";
import type { NodePathType } from "../../types/node-path.ts";
import type { ControlProps } from "../control.tsx";

export interface BaseButtonProps extends ControlProps {
  action_mode?: 1;
  button_group?: NodePathType;
  button_mask?: BitFieldType;
  button_pressed?: boolean;
  disabled?: boolean;
  keep_pressed_outside?: boolean;
  shortcut?: Shortcut;
  shortcut_feedback?: boolean;
  shortcut_in_tooltip?: boolean;
  toggle_mode?: boolean;
}
