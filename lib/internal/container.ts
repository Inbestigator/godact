export interface Container<T> {
  add: (...items: T[]) => void;
  addBefore: (item: T, before: T) => void;
  remove: (toRemove: T) => void;
  clear: () => void;
  find: (predicate: (item: T) => boolean) => T | undefined;
  findType: <U extends T>(
    type: new (...args: Array<NonNullable<unknown>>) => U
  ) => U | undefined;
  [Symbol.iterator]: () => Iterator<T>;
}

export function createContainer<T>(): Container<T> {
  let items: T[] = [];

  return {
    add: function (...newItems: T[]) {
      items.push(...newItems);
    },

    addBefore: function (item: T, before: T) {
      let index = items.indexOf(before);
      if (index === -1) index = items.length;
      items.splice(index, 0, item);
    },

    remove: function (toRemove: T) {
      items = items.filter(function (item) {
        return item !== toRemove;
      });
    },

    clear: function () {
      items = [];
    },

    find: function (predicate: (item: T) => boolean) {
      return items.find(predicate);
    },

    findType: function <U extends T>(
      type: new (...args: Array<NonNullable<unknown>>) => U
    ): U | undefined {
      for (const item of items) {
        if (item instanceof type) return item;
      }
    },

    [Symbol.iterator]: function () {
      return items[Symbol.iterator]();
    },
  };
}
