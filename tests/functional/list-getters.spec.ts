import {nth, nthWithDefault, head, headWithDefault} from '../../lib/index.js';

describe('nth function', () => {
	it('should get value when it\'s there', () => {
		expect(
			nth(['first', 'second', 'third'], 1),
		).toBe('second');
	});

	it('should return undefined when index is not there', () => {
		expect(
			nth(['first', 'second', 'third'], 3),
		).toBe(undefined);
	});

	// This property of the nth function is useful especially
	// with libraries like Mobx that have getters with side-effects.
	it('should not try to access the property if list size is less than requested index', () => {
		const getter = jasmine.createSpy();
		class ArrayWithTrap extends Array<string> {
			get 3() { return getter(); }
		}
		const input = new ArrayWithTrap('first', 'second', 'third');

		// Sanity check
		expect(input.length).toBe(3);
		expect(nth(input, 1)).toBe('second');

		nth(input, 3);
		expect(getter).not.toHaveBeenCalled();
	});
});

describe('nthWithDefault function', () => {
	const defaultValue = Symbol('nthWithDefault/defaultValue');

	it('should get value when it\'s there', () => {
		expect(
			nthWithDefault(defaultValue, ['first', 'second', 'third'], 1),
		).toBe('second');
	});

	it('should return default value when index is not there', () => {
		expect(
			nthWithDefault(defaultValue, ['first', 'second', 'third'], 3),
		).toBe(defaultValue);
	});

	it('should return default value when index < 0', () => {
		expect(
			nthWithDefault(defaultValue, ['first', 'second', 'third'], -1),
		).toBe(defaultValue);
	});

	it('should return default value when the accessed property is undefined', () => {
		expect(
			nthWithDefault(defaultValue, ['first', undefined, 'third'], 1),
		).toBe(defaultValue);
	});
});

describe('head function', () => {
	it('should get value when it\'s there', () => {
		expect(
			head(['first', 'second', 'third']),
		).toBe('first');
	});

	it('should return undefined when index is not there', () => {
		expect(
			head([]),
		).toBe(undefined);
	});

	it('should not try to access the property if list is empty', () => {
		const getter = jasmine.createSpy();
		class ArrayWithTrap extends Array<string> {
			get 3() { return getter(); }
		}
		const input = new ArrayWithTrap('first', 'second', 'third');

		// Sanity check
		expect(input.length).toBe(3);
		expect(nth(input, 1)).toBe('second');

		head(input);
		expect(getter).not.toHaveBeenCalled();
	});
});

describe('headWithDefault function', () => {
	const defaultValue = Symbol('headWithDefault/defaultValue');

	it('should get value when it\'s there', () => {
		expect(
			headWithDefault(defaultValue, ['first', 'second', 'third']),
		).toBe('first');
	});

	it('should return default value when index is not there', () => {
		expect(
			headWithDefault(defaultValue, []),
		).toBe(defaultValue);
	});
});
