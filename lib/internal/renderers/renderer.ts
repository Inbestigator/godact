import { Container } from "../container.ts";
import { Node } from "../node.ts";

export class Renderer {
  readonly nodes = new Container<Node<unknown>>();

  render() {
    for (const node of this.nodes) {
      console.log(node);
    }
  }
}
