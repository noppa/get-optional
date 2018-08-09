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

const getWithDefault = (object, defaultValue, ...rest) =>
	createGetter(defaultValue)(object, ...rest);

const getter = (...keys) => obj =>
	get(obj, ...keys);

const nth = index => list =>
	list == null ? undefined : list[index];

const head = nth(0);

module.exports = { get, getWithDefault, getter, head, nth, };
