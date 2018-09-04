function fmap(fn: Function, object, key1, key2, key3, key4, key5) {
	let value1, value2, value3, value4;
	if (object == null) 		return undefined;
	
	value1 = object[key1];
	if (key2 === undefined) return fn(value1, object);
	if (value1 == null) 		return undefined;

	value2 = value1[key2];
	if (key3 === undefined) return fn(value2, value1);
	if (value2 == null) 		return undefined;

	value3 = value2[key3];
	if (key4 === undefined) return fn(value3, value2);
	if (value3 == null) 		return undefined;

	value4 = value3[key4];
	if (key5 === undefined) return fn(value4, value3);
	if (value4 == null) 		return undefined;

	return fn(value4[key5], value4);
}

function identity(a) { return a; }

/**
 * Gets the value at a given path.
 * Path must consist of 1-5 string keys.  
 * 
 * If one of the keys in path (before the last key) points
 * to a null or undefined value, `defaultValue` is returned instead.
 * 
 * @example
 * ```javascript
 * const object = { a: { b: null, c: { value: 42 } } };
 * 
 * getWithDefault('default', object, 'a', 'c', 'value'); // => 42
 * getWithDefault('default', object, 'a', 'b', 'value'); // => 'default'
 * ```
 */
function getWithDefault(defaultValue, obj, key1, key2, key3, key4, key5) {
	const result =       fmap(identity, obj, key1, key2, key3, key4, key5);
	return result == null ? defaultValue : result;
}

/**
 * Gets the value at a given path.
 * Path must consist of 1-5 string keys.  
 * 
 * If one of the keys in path (before the last key) points
 * to a null or undefined value, `undefined` is returned instead.
 * 
 * @example
 * ```javascript
 * const object = { a: { b: null, c: { value: 42 } } };
 * 
 * get(object, 'a', 'c', 'value'); // => 42
 * get(object, 'a', 'b', 'value'); // => undefined
 * ```
 */
function get           (obj, key1, key2, key3, key4, key5) {
	return fmap(identity, obj, key1, key2, key3, key4, key5);
}

function noop() {} // tslint:disable-line:no-empty

function bind(fn, context) {
	if (typeof fn === 'function') {
		return fn.bind(context);
	}
}

function method            (obj, key1, key2, key3, key4, key5) {
	const result = fmap(bind, obj, key1, key2, key3, key4, key5);
	return result == null ? noop : result;
}

/**
 * Gets the element at a given index of an array.
 * 
 * If the index is out of bounds (larger than the length of the array),
 * `undefined` is returned instead. 
 * 
 * @example
 * ```javascript
 * const list = ['first', 'second', 'third'];
 * 
 * nth(list, 1); // => 'second'
 * nth(list, 3); // => undefined
 * ```
 */
function nth(list, index) {
	return list == null || index < 0 || index >= list.length
		? undefined
		: list[index];
}

/**
 * Gets the element at a given index of an array.
 * 
 * If the index is out of bounds (larger than the length of the array),
 * `defaultValue` is returned instead. 
 * 
 * @example
 * ```javascript
 * const list = ['first', 'second', 'third'];
 * 
 * nthWithDefault('default', list, 1); // => 'second'
 * nthWithDefault('default', list, 3); // => 'default'
 * ```
 */
function nthWithDefault(defaultValue, list, index) {
	const result = nth(list, index);
	return result == null ? defaultValue : result;
}

/**
 * Gets the first element of an array.
 * 
 * If the array is empty, `defaultValue` is returned instead. 
 * 
 * @example
 * ```javascript
 * const list = ['first', 'second', 'third'];
 * 
 * headWithDefault('default', list); // => 'first'
 * headWithDefault('default', []);   // => 'default'
 * ```
 */
function headWithDefault(defaultValue, list) {
	return nthWithDefault(defaultValue, list, 0); 
}

/**
 * Gets the first element of an array.
 * 
 * If the array is empty, `undefined` is returned instead. 
 * 
 * @example
 * ```javascript
 * const list = ['first', 'second', 'third'];
 * 
 * head(list); // => 'first'
 * head([]); // => undefined
 * ```
 */
function head(list) {
	return nth(list, 0);
}

export {
	get,
	getWithDefault,
	nth,
	nthWithDefault,
	head,
	headWithDefault,
	method,
	noop,
};
