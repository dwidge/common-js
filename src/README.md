# error codes

## format

Error and log codes are unique strings, camelCase with no hyphens or spaces.

log: functionName+uniqueNumber

error: functionName+'E'+uniqueNumber

If static strings, they will be searchable even if bundled and minified. If dynamic, they may not be easily searchable.

### easy

```js
console.log("getObject1", data);

throw new Error("getObjectE1");

throw new GenericError("getObjectE1", {
  message: dbError.message,
  status: 500,
  data: dbError,
});
```

### hard

```js
console.log(data);

throw new Error("getObjectE" + __LINE__);

throw new GenericError("getObjectE" + dbError.code, {
  message: dbError.message,
  status: 500,
  data: dbError,
});
```

## searching

A search for unique static error and log codes in the codebase will find their origin and any test cases that expect them.

1. open vscode
2. double click error code 'getObjectE2' in console
3. ctrl+shift+f

or

1. copy error code 'saveObjectE3'
2. open vscode
3. ctrl+shift+f
4. ctrl+v

# authors

Copyright DWJ 2023.  
Distributed under the Boost Software License, Version 1.0.  
https://www.boost.org/LICENSE_1_0.txt
