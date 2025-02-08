// TODO - Heavy TODO, will revisit later to allow for <T> to specify what you can/can't do
// deno-lint-ignore no-explicit-any
export default function Godot<T extends string>(): any {}

export const GlobalMethods: ReturnType<typeof Godot<"Global">> = Godot<
  "Global"
>();

// Will eventually turn into individual exports
// export const Node2DMethods = Godot<"Node2D">();
// or something

// import { Node2DMethods as Godot } from "@gdx/godact/methods";
