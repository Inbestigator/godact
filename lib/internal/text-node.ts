import { Node } from "./node.ts";

export class TextNode extends Node<string> {
  override get text() {
    return this.props;
  }
}
