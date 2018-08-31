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

function nthWithDefault(defaultValue, list, index) {
	return list == null || index < 0 || index >= list.length
		? defaultValue
		: list[index];
}

function nth(list, index) {
	return nthWithDefault(undefined, list, index);
}

function headWithDefault(defaultValue, list) {
	return nthWithDefault(defaultValue, list, 0); 
}

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