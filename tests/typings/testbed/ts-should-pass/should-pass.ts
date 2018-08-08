import {get} from 'safeget';

type E = number;
interface D {
	e: E;
}
interface C {
	d: D;
}
interface B {
	c: C;
}

interface A {
	b: B;
}

declare var input: null | {
	a: A;
};

// Basic usage for all depths
const a: undefined | A = get(input, 'a');
const b: undefined | B = get(input, 'a', 'b');
const c: undefined | C = get(input, 'a', 'b', 'c');
const d: undefined | D = get(input, 'a', 'b', 'c', 'd');
const e: undefined | E = get(input, 'a', 'b', 'c', 'd', 'e');

const toFixed: undefined | typeof Number.prototype.toFixed = get(e, 'toFixed');
