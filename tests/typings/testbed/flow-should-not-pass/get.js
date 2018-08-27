// @flow
import {get} from 'safeget';
import {input} from '../flow-interfaces';
import type {A, B, C, D, E} from '../flow-interfaces';

// Error, because the result can also be undefined
const c: C = get(input, 'a', 'b', 'c');

// Error, because property "c" is not in "a"
const b = get(input, 'a', 'c');

const e: void | E = get(input, 'a', 'b', 'c', 'd', 'e');
// Known limitation in Flow typings, does work in TS
const toFixed: void | typeof Number.prototype.toFixed = get(e, 'toFixed');