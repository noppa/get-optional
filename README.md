# safeget

Typesafe utility functions for getting a property value that's deep in a structure
with possibly nullish intermediate values. 

Includes type definitions for TypeScript and Flow so that the validity of
arguments can be checked and return value inferred.

## Installation

```sh
npm i safeget
```

## Basic usage

```javascript
import {get} from 'safeget'
// Or:
var get = require('safeget').get;

get({ greeting: 'Hello World' }, 'greeting'); // => 'Hello World'
```

## API

### `getWithDefault(defaultValue, object, key1, key2, key3, key4, key5)`

Gets the value at a given path.
Path must consist of 1-5 string keys.
If one of the keys in path (before the last key) points
to a null or undefined value, `defaultValue` is returned instead.

**Example**
```javascript
const object = { a: { b: null, c: { value: 42 } } };

getWithDefault('default', object, 'a', 'c', 'value'); // => 42
getWithDefault('default', object, 'a', 'b', 'value'); // => 'default'
```

### `get(object, key1, key2, key3, key4, key5)`

Gets the value at a given path.
Path must consist of 1-5 string keys.
If one of the keys in path (before the last key) points
to a null or undefined value, `undefined` is returned instead.

**Example**
```javascript
const object = { a: { b: null, c: { value: 42 } } };

get(object, 'a', 'c', 'value'); // => 42
get(object, 'a', 'b', 'value'); // => undefined
```

### `nthWithDefault(defaultValue, list, index)`

Gets the element at a given index of an array.
If the index is out of bounds (larger than the length of the array),
`defaultValue` is returned instead.

**Example**
```javascript
const list = ['first', 'second', 'third'];

nthWithDefault('default', list, 1); // => 'second'
nthWithDefault('default', list, 3); // => 'default'
```

### `nth(list, index)`

Gets the element at a given index of an array.
If the index is out of bounds (larger than the length of the array),
`undefined` is returned instead.

**Example**
```javascript
const list = ['first', 'second', 'third'];

nth(list, 1); // => 'second'
nth(list, 3); // => undefined
```

### `headWithDefault(defaultValue, list)`
Gets the first element of an array.
If the array is empty, `defaultValue` is returned instead.

**Example**
```javascript
const list = ['first', 'second', 'third'];

headWithDefault('default', list); // => 'first'
headWithDefault('default', []);   // => 'default'
```

### `head(list)`
Gets the first element of an array.
If the array is empty, `undefined` is returned instead.

**Example**
```javascript
const list = ['first', 'second', 'third'];

head(list); // => 'first'
head([]); // => undefined
```

## Caveats
* The type definition for Flow doesn't allow accessing array indexes using `get`/`getWithDefault`.
  Use `nth`/`nthWithDefault`/`head`/`headWithDefault` instead:
	```javascript
	 nth(get(input, 'foo', 'arrayProperty'), 1);
	```
* This library is **NOT** meant to be used for accessing *dynamic* property paths.
	```javascript
	// Don't do this
	get(input, ...propertyNamesList);
	```
  There are other libraries that handle that use-case better and safer, the focus of this one
	is in type safety, not flexibility or fault-tolerance.
