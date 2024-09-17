// Copyright DWJ 2023.
// Made with ChatGPT.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

/**
 * Traverses an object recursively and calls a callback function on each leaf node.
 *
 * @param {object} obj - The object to traverse.
 * @param {function} callback - The callback function to call on each leaf node. The function
 * should take two arguments: the value of the leaf node and an array of keys representing the
 * path to the node in the object. For example, if the leaf node is obj.a.b.c, the path array
 * would be ['a', 'b', 'c'].
 * @throws {TypeError} If the first argument is not an object.
 * @throws {TypeError} If the second argument is not a function.
 */

export function traverseObject(obj, callback) {
  const stack = [[obj, []]];
  while (stack.length) {
    const [current, path] = stack.pop();
    if (typeof current === "object" && current !== null) {
      if (Array.isArray(current)) {
        for (let i = 0; i < current.length; i++) {
          stack.push([current[i], [...path, i]]);
        }
      } else {
        for (const key in current) {
          stack.push([current[key], [...path, key]]);
        }
      }
    } else {
      callback(current, path);
    }
  }
}
