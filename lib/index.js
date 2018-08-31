function getWithDefault(defaultValue, object, key1, key2, key3, key4, key5) {
	var value1, value2, value3, value4, value5;

	if (object == null || key1 === undefined) return defaultValue;
	
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

function get(object, key1, key2, key3, key4, key5) {
	return getWithDefault(undefined, object, key1, key2, key3, key4, key5);
}

/*
const createGetter = defaultValue => (object, ...keys) => {
	let currentValue = object;
	for (const key of keys) {
			if (currentValue == null) {
					return defaultValue;
			}
			currentValue = currentValue[key];
	}
	return currentValue;
};

const get = createGetter(undefined);

const getWithDefault = (defaultValue, ...rest) =>
	createGetter(defaultValue)(...rest);

const createNth = defaultValue => (list, index) =>
	list == null
		? defaultValue
		: ((index < list.length)
			? list[index]
			: defaultValue)

const nth = createNth(undefined)
const nthWithDefault = (defaultValue, ...rest) => createNth(defaultValue)(...rest);

const head = (list) => nth(list, 0);
const headWithDefault = (defaultValue, list) => nthWithDefault(defaultValue, list, 0);
*/

module.exports = {
	get,
	getWithDefault,
	// nth,
	// nthWithDefault,
	// head,
	// headWithDefault,
};