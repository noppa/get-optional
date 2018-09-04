import {method, noop} from '../../lib/index.js';

describe('method function', () => {
	interface Input {
		a: {
			b?: {
				c: {
					d: {
						spy: null | jasmine.Spy,
					},
				},
				method: undefined | (() => any),
			},
		};
	}
	let inputWithFunctions: undefined | Input;
	let inputWithoutB: undefined | Input;
	let inputWithoutFunctions: undefined | Input;
	let spy: jasmine.Spy;

	beforeEach(() => {
		spy = jasmine.createSpy();
		inputWithFunctions = {
			a: {
				b: {
					c: {
						d: {
							spy,
						},
					},
					method() {
						return this;
					},
				},
			},
		};
		inputWithoutB = {
			a: { },
		};
		inputWithoutFunctions = {
			a: {
				b: {
					c: {
						d: {
							spy: null,
						},
					},
					method: undefined,
				},
			},
		};
	});

	it('should always return a function', () => {
		expect(
			typeof method(inputWithFunctions, 'a', 'b', 'c', 'd', 'spy'),
		).toBe('function');
		expect(
			typeof method(inputWithoutB, 'a', 'b', 'c', 'd', 'spy'),
		).toBe('function');
		expect(
			typeof method(inputWithoutFunctions, 'a', 'b', 'c', 'd', 'spy'),
		).toBe('function');
	});

	it('should return noop when path leads to non-function value', () => {
		const testValues = [undefined, null, 'str', { call() { return 5; } }];
		expect.assertions(testValues.length);

		for (const testValue of testValues) {
			const input: any = {a: testValue};
			expect(
				method(input, 'a', 'b'),
			).toBe(noop);
		}
	});

	it('should not call the function on its own', () => {
		expect.assertions(2);
		const fn = method(inputWithFunctions, 'a', 'b', 'c', 'd', 'spy');
		expect(spy).not.toHaveBeenCalled();
		fn();
		expect(spy).toHaveBeenCalledWith();
	});

	it('should bind "this" context to the second to last property', () => {
		expect.assertions(1);
		const fn = method(inputWithFunctions, 'a', 'b', 'method');
		// The inputWithFunctions.a.b.method() should return "this"
		const result = fn();
		expect(result).toBe(inputWithFunctions!.a!.b);
	});
});

describe('noop function', () => {
	it('should return undefined on any input', () => {
		expect.assertions(2);
		expect(noop()).toBeUndefined();
		expect(noop(1, 2, 3)).toBeUndefined();
	});
});
