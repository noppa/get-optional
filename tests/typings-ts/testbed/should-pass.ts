import {get} from 'safeget';

interface Input {
	a: {
		b: {
			c: {
				d: {
					e: number;
				},
			},
		},
	};
}

declare var input: Input;

// Should pass
const e: undefined | number = get(input, 'a', 'b', 'c', 'd', 'e');
