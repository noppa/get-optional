
// Base implementation for all getters.
// Gets the value in the given path and calls `interceptor` with it
// and the previous context object or returns undefined if the path is not found.
function mapProperty(interceptor: Function, object, key1, key2, key3, key4, key5) {
	let value1, value2, value3, value4;
	if (object == null)     return undefined;
	
	value1 = object[key1];
	if (key2 === undefined) return interceptor(value1, object);
	if (value1 == null)     return undefined;

	value2 = value1[key2];
	if (key3 === undefined) return interceptor(value2, value1);
	if (value2 == null)     return undefined;

	value3 = value2[key3];
	if (key4 === undefined) return interceptor(value3, value2);
	if (value3 == null)     return undefined;

	value4 = value3[key4];
	if (key5 === undefined) return interceptor(value4, value3);
	if (value4 == null)     return undefined;

	return interceptor(value4[key5], value4);
}

function identity(a) { return a; }

function getWithDefault(defaultValue, obj, key1, key2, key3, key4, key5) {
	const result = mapProperty(identity, obj, key1, key2, key3, key4, key5);
	return result == null ? defaultValue : result;
}

function get(obj, key1, key2, key3, key4, key5) {
	return mapProperty(identity, obj, key1, key2, key3, key4, key5);
}

function noop() {} // tslint:disable-line:no-empty

function bind(fn, context) {
	if (typeof fn === 'function') {
		return fn.bind(context);
	} else {
		return undefined;
	}
}

function method(obj, key1, key2, key3, key4, key5) {
	const result = mapProperty(bind, obj, key1, key2, key3, key4, key5);
	return result == null ? noop : result;
}

function nth(list, index) {
	return list == null || index < 0 || index >= list.length
		? undefined
		: list[index];
}

function nthWithDefault(defaultValue, list, index) {
	const result = nth(list, index);
	return result == null ? defaultValue : result;
}

function headWithDefault(defaultValue, list) {
	return nthWithDefault(defaultValue, list, 0); 
}

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
