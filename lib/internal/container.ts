export interface Container<T> {
  add: (...items: T[]) => void;
  clear: () => void;
  [Symbol.iterator]: () => Iterator<T>;
}

export function createContainer<T>(): Container<T> {
  let items: T[] = [];

  return {
    add: function (...newItems: T[]) {
      items.push(...newItems);
    },
    clear: function () {
      items = [];
    },
    [Symbol.iterator]: function () {
      return items[Symbol.iterator]();
    },
  };
}
