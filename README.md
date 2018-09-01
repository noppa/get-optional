# get-optional

Typesafe utility functions for getting a property value that's deep in a structure
with possibly nullish intermediate values. 

Includes type definitions for **TypeScript** and **Flow** so that the validity of
arguments can be checked and return value inferred.

<img alt="TypeScript automatic inference example" src="assets/inference-example.png" width="400"/>

## Installation

```sh
npm i get-optional
```

## Basic usage

```javascript
import {get} from 'get-optional'
// Or:
var get = require('get-optional').get;

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

## Other tools like this
* [lodash.get](https://lodash.com/docs/#get) is a well-established and flexible utility function for safe property access.
	Lodash is also such a common dependency that you probably already have it, at least as a
	transitive dependency.  
	I recommend it if you aren't using TypeScript or Flow or you aren't so
	strict about your static types.
* [typesafe-get](https://github.com/pimterry/typesafe-get) seems very similar to *get-optional* for
  TypeScript users. I can't say much about it because I haven't personally used it (I started
	developing this one without knowing there was a typesafe alternative already). You might want
	to check that out anyway!
* [Optional chaining operator](https://github.com/tc39/proposal-optional-chaining) is *hopefully* coming
  to the language itself at some point and there's already a Babel plugin for it. The spec might still
	change, though, and some of the tools you are currently using might not support it.
