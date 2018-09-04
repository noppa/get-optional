import {method} from '../../lib/index.js';

fdescribe('method function', () => {
	interface Input {
		a: {
			b?: {
				c: {
					d: {
						spy: null | jasmine.Spy,
					},
				},
				method: void | (() => any),
			},
		};
	}
	let inputWithFunctions: void | Input;
	let inputWithoutB: void | Input;
	let inputWithoutFunctions: void | Input;
	let spy: any;

	beforeEach(() => {
		spy = jasmine.createSpy;
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
});
