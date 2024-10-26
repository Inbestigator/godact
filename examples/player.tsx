import { CharacterBody2D, CollisionShape2D } from "@inbestigator/godact/nodes";
import { createPhysicsMaterial } from "@inbestigator/godact/resources";

export default function Player() {
  return (
    <CharacterBody2D name="Player">
      <CollisionShape2D shape={createPhysicsMaterial({})} />
    </CharacterBody2D>
  );
}
