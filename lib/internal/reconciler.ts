// @ts-types="npm:@types/react-reconciler@^0.28.9"
import ReactReconciler, { type HostConfig } from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants.js";
import { isNode, type Node } from "./node.ts";
import type { Renderer } from "./renderer.ts";
import { createTextNode, type TextNode } from "./text-node.ts";

const config: HostConfig<
  string, // Type,
  Record<string, unknown>, // Props,
  Renderer, // Container,
  Node<unknown>, // Instance,
  TextNode, // TextInstance,
  never, // SuspenseInstance,
  never, // HydratableInstance,
  never, // PublicInstance,
  never, // HostContext,
  true, // UpdatePayload,
  never, // ChildSet,
  number, // TimeoutHandle,
  number // NoTimeout,
> = {
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,
  isPrimaryRenderer: true,
  scheduleTimeout: globalThis.setTimeout,
  cancelTimeout: globalThis.clearTimeout,
  noTimeout: -1,

  getRootHostContext: () => null,
  getChildHostContext: (parentContext) => parentContext,

  createInstance: (type, props) => {
    if (type !== "godot-node") {
      throw new Error(`Unknown node type: ${type}`);
    }

    if (typeof props.createNode !== "function") {
      throw new Error(`Missing createNode function`);
    }

    const node: unknown = props.createNode(props.props);
    if (!isNode(node)) {
      throw new Error(`createNode function did not return a Node`);
    }

    return node;
  },
  createTextInstance: (text) => createTextNode(text),
  shouldSetTextContent: () => false,
  detachDeletedInstance: (_instance) => {},
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  getInstanceFromNode: () => null,
  getInstanceFromScope: () => null,
  clearContainer: (renderer) => {
    renderer.nodes.clear();
  },
  appendChildToContainer: (renderer, child) => {
    renderer.nodes.add(child);
  },
  appendInitialChild: (parent, child) => {
    parent.children.add(child);
  },
  prepareUpdate: () => true,
  prepareForCommit: () => null,
  resetAfterCommit: (renderer) => {
    renderer.render();
  },
  prepareScopeUpdate: () => {},
  preparePortalMount: () => {
    throw new Error("Portals are not supported");
  },
  getPublicInstance: () => {
    throw new Error("Refs are currently not supported");
  },
  finalizeInitialChildren: () => false,
  getCurrentEventPriority: () => DefaultEventPriority,
};

export const reconciler = ReactReconciler(config);
