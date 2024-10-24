export const expectedTranspiledScene = `[gd_scene format=3]
[ext_resource type="Script" path="res://player/player.gd" id="00000000-0000-0000-0000-000000000000"]
[sub_resource type="RectangleShape2D" id="00000000-0000-0000-0000-000000000000"]
[node name="Player" type="CharacterBody2D"]
script = ExtResource("00000000-0000-0000-0000-000000000000")
[node name="00000000-0000-0000-0000-000000000000" type="CollisionShape2D" parent="."]
shape = SubResource("00000000-0000-0000-0000-000000000000")
scale = Vector2(2, 3)
disabled = true`;

export const expectedVNodes = {
  Player: {
    path: "./examples/player.gdx",
    root: {
      type: "CharacterBody2D",
      props: {
        children: [
          {
            type: "CollisionShape2D",
            props: {
              shape: "rect",
              scale: "V2 2, 3",
              disabled: true,
            },
          },
        ],
        script: "res://player/player.gd",
        name: "Player",
      },
    },
  },
};
