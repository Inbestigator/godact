import { Container } from "./container.ts";

export abstract class Node<Props> {
  readonly children = new Container<Node<unknown>>();

  constructor(public props: Props) {}

  get text(): string {
    return [...this.children].map((child) => child.text).join("");
  }
}
