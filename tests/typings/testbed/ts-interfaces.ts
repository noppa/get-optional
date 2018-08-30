
type E = number;
interface D {
	e: E;
}
interface C {
	d: D;
	arr: boolean[];
	readonlyArr: ReadonlyArray<boolean>;
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

export {
	A, B, C, D, E, input,
};
