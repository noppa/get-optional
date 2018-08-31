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

get({ greeting: 'Hello World' }, 'a'); // => 'Hello World'
```

## API
