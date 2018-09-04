
type E = number;
interface D {
	e: E;
}
interface C {
	d: undefined | D;
	arr: boolean[];
	readonlyArr: ReadonlyArray<boolean>;
}
interface B {
	c?: C;
}

interface A {
	b: null | B;
}

declare var input: null | {
	a: A;
};

interface MethodInput {
	a?: {
		b: {
			c: {
				fn: null | ((a: string) => number),
			},
		},
	};
}

declare var methodInput: undefined | null | MethodInput;

export {
	A, B, C, D, E, input, MethodInput, methodInput,
};
