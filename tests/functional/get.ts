import {get} from '../../lib/index.js';

interface Input {
	a: null | {
		b: null | { num: number },
	};
}

describe('get function', () => {
	it('should return value when it\'s there', () => {
		const value = { num: 5 };
		const obj: Input = {
			a: {
				b: value,
			},
		};

		expect(get(obj, 'a', 'b')).toBe(value);
	});

	it('should return undefined when the path contains null', () => {
		const obj: Input = {
			a: null,
		};

		expect(get(obj, 'a', 'b')).toBe(undefined);
	});

	it('should return null when the last key points to null', () => {
		const obj: Input = {
			a: {
				b: null,
			},
		};

		expect(get(obj, 'a', 'b')).toBe(null);
	});
});
