// @flow
import {get} from 'get-optional';
import {input, InputClass} from '../flow-interfaces';
import type {A, B, C, D, E} from '../flow-interfaces';

// Error: The result can also be undefined
const c: C = get(input, 'a', 'b', 'c');

// Error: Property "c" is not in input.a
const b = get(input, 'a', 'c');

const e: void | E = get(input, 'a', 'b', 'c', 'd', 'e');
// Known limitation in Flow typings (number is not an object), does work in TS.
const toFixed: void | typeof Number.prototype.toFixed = get(e, 'toFixed');

// Error: The inferred return value is undefined, not null.
// Note: TS doesn't even allow us to make this function call since there's
// no way "a" is in null.
const fromNull: null = get(null, 'a');

// Known limitation in Flow typings (no indexer property in classes or interfaces).
// See flow-should-pass/get.js for a workaround.
const inputClassValue: void | number = get(new InputClass(), 'self', 'self', 'value');