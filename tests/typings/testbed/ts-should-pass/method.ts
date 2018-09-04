import {method} from 'get-optional';

interface Input {
	a?: {
		b: {
			c: {
				fn: null | ((a: string) => number),
			},
		},
	};
}

declare var input: Input;

const result: number | undefined = method(input, 'a', 'b', 'c', 'fn')('Hello');
