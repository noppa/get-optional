// @flow

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

export type {
	A, B, C, D, E, input,
};
