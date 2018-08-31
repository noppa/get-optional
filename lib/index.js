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

const getWithDefault = (defaultValue, object, ...rest) =>
	createGetter(defaultValue)(object, ...rest);

const nth = (list, index) =>
	list == null ? undefined : list[index];

const head = (list) => nth(list, 0)

module.exports = { get, getWithDefault, head, nth, };
