// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const readDataURLBlob = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result as string);
    };
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
