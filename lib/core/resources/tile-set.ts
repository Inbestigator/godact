/**
 * Returntype of createTileSet
 *
 * @category Visual
 */
export interface TileSet {
  type: "TileSet";
  props: { path: string };
}

/**
 * A TileSet is a library of tiles for a TileMap. A TileSet handles a list of TileSetSource, each of them storing a set of tiles.
 *
 * @example
 * ```tsx
 * <TileMapLayer
 *   name="TileMapLayer"
 *   tile_set={createTileSet("res://tileset.tres")}
 * />
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_tileset.html
 */
export function createTileSet(path: string): TileSet {
  return {
    type: "TileSet",
    props: { path },
  };
}
