
export interface IGet {
	<T, Key1 extends keyof T>(object: T, key1: Key1): undefined | T[Key1];
	<T, Key1 extends keyof T, Key2 extends keyof T[Key1]>
		(object: T, key1: Key1, key2: Key2): undefined | NonNullable<T[Key1]>[Key2];
	<T, Key1 extends keyof T, Key2 extends keyof T[Key1],
		Key3 extends keyof T[Key1][Key2]>
		(object: T, key1: Key1, key2: Key2, key3: Key3)
		: undefined | NonNullable<NonNullable<T[Key1]>[Key2]>[Key3];
}

export interface IProperty {
	<T, Key1 extends keyof T>(key1: Key1)
		: (object: T) => undefined | T[Key1];
	<T, Key1 extends keyof T, Key2 extends keyof T[Key1]>
		(key1: Key1, key2: Key2)
		: (object: T) => undefined | NonNullable<T[Key1]>[Key2];
	<T, Key1 extends keyof T, Key2 extends keyof T[Key1],
		Key3 extends keyof T[Key1][Key2]>
		(key1: Key1, key2: Key2, key3: Key3)
		: (object: T) => undefined | NonNullable<NonNullable<T[Key1]>[Key2]>[Key3];
}

export interface IGetWithDefault {
	<Default, T, Key1 extends keyof T>(defaultValue: Default, object: T, key1: Key1): Default | T[Key1];
	<Default, T, Key1 extends keyof T, Key2 extends keyof T[Key1]>
		(defaultValue: Default, object: T, key1: Key1, key2: Key2): Default | NonNullable<T[Key1]>[Key2];
	<Default, T, Key1 extends keyof T, Key2 extends keyof T[Key1],
		Key3 extends keyof T[Key1][Key2]>
		(defaultValue: Default, object: T, key1: Key1, key2: Key2, key3: Key3)
		: Default | NonNullable<NonNullable<T[Key1]>[Key2]>[Key3];
}

const createGetter = (defaultValue: any) => (object: object, ...keys: Array<string|number|symbol>) => {
	let currentValue: any = object;
	for (const key of keys) {
		if (currentValue == null) { return defaultValue; }
		currentValue = currentValue[key];
	}
	return currentValue;
};

const get: IGet = createGetter(undefined);
const getWithDefault: IGetWithDefault = (defaultValue: any, object: object, ...keys: any[]) =>
	createGetter(defaultValue)(object, ...keys);

const getter: IProperty = (...keys: any[]) => (obj: object) => (get as any)(obj, ...keys);

type GetIndex = <T>(list: T[] | undefined | null) => undefined | T;

const nth = (index: number): GetIndex => <T>(list: T[] | undefined | null): undefined | T =>
	list == null ? undefined : list[index];

const head: GetIndex = nth(0);

export {
	get,
	getWithDefault,
	getter,
	head,
	nth,
};
