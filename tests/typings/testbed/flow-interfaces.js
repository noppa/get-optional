// @flow

type E = number;
type D = {
	e: E;
}
type C = {
	d: void | D;
	arr: boolean[];
	readonlyArr: $ReadOnlyArray<boolean>;
}
type B = {
	c?: C;
}

type A = {
	b: null | B;
}

declare var input: null | {
	a: A;
};

class InputClass {
	self: ?InputClass;
	value: number;
}

type MethodInput = {
	a?: {
		b: {
			c: {
				fn: null | ((a: string) => number),
			},
		},
	};
}

declare var methodInput: MethodInput;

export type {
	A, B, C, D, E, InputClass, MethodInput,
};

export {
	input, methodInput,
}
