// @flow
import {method} from 'get-optional';

type Input = {
	a?: {
		b: {
			c: {
				fn: null | ((a: string) => number),
			},
		},
	};
}

declare var input: Input;

const result: number | void = method(input, 'a', 'b', 'c', 'fn')('Hello');
