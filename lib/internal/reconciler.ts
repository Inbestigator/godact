// @ts-types="@types/react-reconciler"
import ReactReconciler, { type HostConfig } from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants.js";
import { isNode, Node } from "./node.ts";
import type { Renderer } from "./renderers/renderer.ts";
import { createTextNode, TextNode } from "./text-node.ts";

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
  getInstanceFromNode: (_node: unknown) => null,
  getInstanceFromScope: (_scopeInstance: unknown) => null,

  clearContainer: (renderer) => {
    renderer.nodes.clear();
  },
  appendChildToContainer: (renderer, child) => {
    renderer.nodes.add(child);
  },
  removeChildFromContainer: (renderer, child) => {
    renderer.nodes.remove(child);
  },
  insertInContainerBefore: (renderer, child, before) => {
    renderer.nodes.addBefore(child, before);
  },

  appendInitialChild: (parent, child) => {
    parent.children.add(child);
  },
  appendChild: (parent, child) => {
    parent.children.add(child);
  },
  removeChild: (parent, child) => {
    parent.children.remove(child);
  },
  insertBefore: (parent, child, before) => {
    parent.children.addBefore(child, before);
  },

  prepareUpdate: () => true,
  commitUpdate: (node, _payload, _type, _oldProps, newProps) => {
    node.props = newProps.props;
  },
  commitTextUpdate: (node, _oldText, newText) => {
    node.props = newText;
  },

  prepareForCommit: () => null,
  resetAfterCommit: (renderer) => {
    renderer.render();
  },
  prepareScopeUpdate: (_scopeInstance: unknown, _instance: unknown) => {},

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
