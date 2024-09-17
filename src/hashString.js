// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

//gist.github.com/jlevy/c246006675becc446360a798e2b2d781

exports.hashString = (s) => {
  var h = 0,
    l = s.length,
    i = 0;
  while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  return new Uint32Array([h])[0].toString(36).slice(0, 7);
};
