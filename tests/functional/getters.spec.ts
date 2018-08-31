import {get, getWithDefault} from '../../lib/index.js';

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

	it('should return undefined when input is null', () => {
		// This trickery is here just to prevent TS from inferring input === null
		const obj: null | Input = 1 ? null : { a: { b: null } };
		expect(obj).toBe(null); // Sanity check

		expect(get(obj, 'a', 'b')).toBe(undefined);
	});
});

describe('getWithDefault function', () => {
	const defaultValue = Symbol('getWithDefault/defaultValue');

	it('should return value when it\'s there', () => {
		const value = { num: 5 };
		const obj: Input = {
			a: {
				b: value,
			},
		};

		expect(getWithDefault(defaultValue, obj, 'a', 'b')).toBe(value);
	});

	it('should return default value when the path contains null', () => {
		const obj: Input = {
			a: null,
		};

		expect(getWithDefault(defaultValue, obj, 'a', 'b')).toBe(defaultValue);
	});

	it('should return null when the last key points to null', () => {
		const obj: Input = {
			a: {
				b: null,
			},
		};

		expect(getWithDefault(defaultValue, obj, 'a', 'b')).toBe(null);
	});

	it('should return default value when input is null', () => {
		// This trickery is here just to prevent TS from inferring input === null
		const obj: null | Input = 1 ? null : { a: { b: null } };
		expect(obj).toBe(null); // Sanity check

		expect(getWithDefault(defaultValue, obj, 'a', 'b')).toBe(defaultValue);
	});
});
