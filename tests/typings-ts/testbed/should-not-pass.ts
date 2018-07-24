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

// Error: Result can be undefined
const c: C = get(input, 'a', 'b', 'c');
