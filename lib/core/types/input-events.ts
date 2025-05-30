// TODO TEMPORARILY ONLY KEYBOARD EVENTS, WILL ADD MORE

/**
 * Returntype for InputEvent
 *
 * @category Vectors
 */
export interface InputEventType {
  type: `InputEvent${string}`;
  props: InputEventKey;
}

/**
 * A 2D vector using floating-point coordinates.
 *
 * @example
 * ```ts
 * InputEvent(1, 2);
 * ```
 *
 * @category Vectors
 * @see https://docs.godotengine.org/en/stable/classes/class_inputevent.html
 */
export function InputEvent(props: InputEventKey): InputEventType {
  if (props.keycode && typeof props.keycode === "string") {
    props.keycode = keycodes[props.keycode];
  }
  return {
    type: "InputEventKey",
    props,
  };
}

interface BaseInputEvent {
  device?: number;
}

interface InputEventFromWindow extends BaseInputEvent {
  window_id?: number;
}

interface InputEventWithModifiers extends InputEventFromWindow {
  alt_pressed?: boolean;
  command_or_control_autoremap?: boolean;
  ctrl_pressed?: boolean;
  meta_pressed?: boolean;
  shift_pressed?: boolean;
}

interface InputEventKey extends InputEventWithModifiers {
  echo?: boolean;
  key_label?: number;
  keycode?: keyof typeof keycodes | number;
  location?: 0 | 1 | 2;
  physical_keycode?: number;
  pressed?: boolean;
  unicode?: number;
}

const keycodes = {
  KEY_NONE: 0,
  KEY_SPECIAL: 4194304,
  KEY_ESCAPE: 4194305,
  KEY_TAB: 4194306,
  KEY_BACKTAB: 4194307,
  KEY_BACKSPACE: 4194308,
  KEY_ENTER: 4194309,
  KEY_KP_ENTER: 4194310,
  KEY_INSERT: 4194311,
  KEY_DELETE: 4194312,
  KEY_PAUSE: 4194313,
  KEY_PRINT: 4194314,
  KEY_SYSREQ: 4194315,
  KEY_CLEAR: 4194316,
  KEY_HOME: 4194317,
  KEY_END: 4194318,
  KEY_LEFT: 4194319,
  KEY_UP: 4194320,
  KEY_RIGHT: 4194321,
  KEY_DOWN: 4194322,
  KEY_PAGEUP: 4194323,
  KEY_PAGEDOWN: 4194324,
  KEY_SHIFT: 4194325,
  KEY_CTRL: 4194326,
  KEY_META: 4194327,
  KEY_ALT: 4194328,
  KEY_CAPSLOCK: 4194329,
  KEY_NUMLOCK: 4194330,
  KEY_SCROLLLOCK: 4194331,
  KEY_F1: 4194332,
  KEY_F2: 4194333,
  KEY_F3: 4194334,
  KEY_F4: 4194335,
  KEY_F5: 4194336,
  KEY_F6: 4194337,
  KEY_F7: 4194338,
  KEY_F8: 4194339,
  KEY_F9: 4194340,
  KEY_F10: 4194341,
  KEY_F11: 4194342,
  KEY_F12: 4194343,
  KEY_F13: 4194344,
  KEY_F14: 4194345,
  KEY_F15: 4194346,
  KEY_F16: 4194347,
  KEY_F17: 4194348,
  KEY_F18: 4194349,
  KEY_F19: 4194350,
  KEY_F20: 4194351,
  KEY_F21: 4194352,
  KEY_F22: 4194353,
  KEY_F23: 4194354,
  KEY_F24: 4194355,
  KEY_KP_MULTIPLY: 4194433,
  KEY_KP_DIVIDE: 4194434,
  KEY_KP_SUBTRACT: 4194435,
  KEY_KP_PERIOD: 4194436,
  KEY_KP_ADD: 4194437,
  KEY_KP_0: 4194438,
  KEY_KP_1: 4194439,
  KEY_KP_2: 4194440,
  KEY_KP_3: 4194441,
  KEY_KP_4: 4194442,
  KEY_KP_5: 4194443,
  KEY_KP_6: 4194444,
  KEY_KP_7: 4194445,
  KEY_KP_8: 4194446,
  KEY_KP_9: 4194447,
  KEY_MENU: 4194370,
  KEY_HYPER: 4194371,
  KEY_HELP: 4194373,
  KEY_BACK: 4194376,
  KEY_FORWARD: 4194377,
  KEY_STOP: 4194378,
  KEY_REFRESH: 4194379,
  KEY_VOLUMEDOWN: 4194380,
  KEY_VOLUMEMUTE: 4194381,
  KEY_VOLUMEUP: 4194382,
  KEY_MEDIAPLAY: 4194388,
  KEY_MEDIASTOP: 4194389,
  KEY_MEDIAPREVIOUS: 4194390,
  KEY_MEDIANEXT: 4194391,
  KEY_MEDIARECORD: 4194392,
  KEY_HOMEPAGE: 4194393,
  KEY_FAVORITES: 4194394,
  KEY_SEARCH: 4194395,
  KEY_STANDBY: 4194396,
  KEY_OPENURL: 4194397,
  KEY_LAUNCHMAIL: 4194398,
  KEY_LAUNCHMEDIA: 4194399,
  KEY_GLOBE: 4194416,
  KEY_KEYBOARD: 4194417,
  KEY_JIS_EISU: 4194418,
  KEY_JIS_KANA: 4194419,
  KEY_UNKNOWN: 8388607,
  KEY_SPACE: 32,
  KEY_EXCLAM: 33,
  KEY_QUOTEDBL: 34,
  KEY_NUMBERSIGN: 35,
  KEY_DOLLAR: 36,
  KEY_PERCENT: 37,
  KEY_AMPERSAND: 38,
  KEY_APOSTROPHE: 39,
  KEY_PARENLEFT: 40,
  KEY_PARENRIGHT: 41,
} as const;
