// @flow
import {get} from 'safeget';

type E = number;
type D = {
	e: E;
}
type C = {
	d: D;
}
type B = {
	c: C;
}

type A = {
	b: B;
}

declare var input: null | {
	a: A;
};

// Error, because the result can also be undefined
const c: C = get(input, 'a', 'b', 'c');

// Error, because property "c" is not in "a"
const b = get(input, 'a', 'c');

const e: void | E = get(input, 'a', 'b', 'c', 'd', 'e');
// Known limitation in Flow typings, does work in TS
const toFixed: void | typeof Number.prototype.toFixed = get(e, 'toFixed');