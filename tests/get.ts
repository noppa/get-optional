import {get} from '../index';

describe('get function', () => {
	it('should find value when its there', () => {
		const value = {};
		const obj = {
			a: {
				b: value,
			},
		};

		expect(get(obj, 'a', 'b')).toBe(value);
	});
});
