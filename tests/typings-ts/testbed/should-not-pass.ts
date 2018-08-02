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

// Error, because the result can also be undefined
const c: C = get(input, 'a', 'b', 'c');

// Error, because property "c" is not in "a"
const b = get(input, 'a', 'c');
