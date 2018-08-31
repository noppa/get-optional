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
function getWithDefault(defaultValue, object, key1, key2, key3, key4, key5) {
	var value1, value2, value3, value4, value5;
	if (key1 === undefined) return object;
	if (object == null) 		return defaultValue;
	
	value1 = object[key1];
	if (key2 === undefined) return value1;
	if (value1 == null) 		return defaultValue;

	value2 = value1[key2];
	if (key3 === undefined) return value2;
	if (value2 == null) 		return defaultValue;

	value3 = value2[key3];
	if (key4 === undefined) return value3;
	if (value3 == null) 		return defaultValue;

	value4 = value3[key4];
	if (key5 === undefined) return value4;
	if (value4 == null) 		return defaultValue;

	return value4[key5];
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
function get(object, key1, key2, key3, key4, key5) {
	return getWithDefault(undefined, object, key1, key2, key3, key4, key5);
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
	return list == null || index < 0 || index >= list.length
		? defaultValue
		: list[index];
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
	return nthWithDefault(undefined, list, index);
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
	return nthWithDefault(undefined, list, 0);
}

module.exports = {
	get,
	getWithDefault,
	nth,
	nthWithDefault,
	head,
	headWithDefault,
};