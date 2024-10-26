import type { Node2DProps } from "../node-2d.tsx";

export interface CollisionObject2DProps extends Node2DProps {
  collision_layer?: number;
  collision_mask?: number;
  collision_priority?: number;
  disable_mode?: 0 | 1 | 2;
  input_pickable?: boolean;
}

export interface PhysicsBody2DProps extends CollisionObject2DProps {
  input_pickable?: false;
}
