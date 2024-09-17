// Maze 1.0
// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import Dungeon from "@mikewesthad/dungeon";

export const make = (width = 30, height = 30) =>
  new Dungeon({
    width,
    height,
    doorPadding: 1,
    rooms: {
      width: {
        min: 3,
        max: 6,
        onlyOdd: true, // Or onlyEven: true
      },
      height: {
        min: 3,
        max: 6,
        onlyOdd: true, // Or onlyEven: true
      },
      maxArea: 150,
      maxRooms: 50,
    },
  });

export const tiles = (dungeon) =>
  dungeon.getMappedTiles({
    floor: 0,
    door: 0,
    wall: 1,
    empty: 1,
  });

export const dims = (a) => [a[0]?.length, a.length];

export const find = (map, tile = 0) => {
  const [w, h] = dims(map);
  for (var i = 0; i < 32; i++) {
    const [px, py] = [randi(w), randi(h)];
    if (map[py][px] === tile) return [px, py];
  }
};

export const isEmpty = (map, [x, y]) => !map[y]?.[x];

export const tryMove = (map, p, np) => (isEmpty(map, np) ? np : p);

export const randi = (x) => (Math.random() * x) | 0;
