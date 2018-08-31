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

module.exports = {
	get,
	getWithDefault,
	nth,
	nthWithDefault,
	head,
	headWithDefault,
};
