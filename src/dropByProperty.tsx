// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export function dropByProperty<T extends { id: V }, V>(a: T[], props: V[]) {
  return a.filter((elt) => props.includes(elt.id));
}
