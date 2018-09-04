import { TabsProvider, writeFile, relativeToRoot } from './shared';
import { getter, buildWith } from './generators';

const notNil = (type: string) => `$NonMaybeType<${type}>`;

function* generatorForGetters(
	tabs: TabsProvider,
	withDefaultValue: boolean,
	forMethod: boolean,
) {
	yield* getter(tabs, {
		withDefaultValue,
		forMethod,
		notNil,
		prevIndexer(prevIndex, prevType) {
			return prevIndex > 0
				? `$ElementType<${prevType}, Key${prevIndex}>`
				: prevType;
		},
		typeArgumentKeyN(keyNumber) {
			const typeRestriction = keyNumber === 1
				? '$Keys<$NonMaybeType<T>>'
				: 'Prop';
			return `Key${keyNumber}: ${typeRestriction}`;
		},
		returnType: forMethod ? returnTypeForMethodGetter : returnTypeForGetter,
		exportVar(varname, typename) {
			return `declare export var ${varname}: ${typename}`;
		},
	});
}

const noopType = {
	definition: `(...args: any[]) => void`,
	name: 'Noop',
};

function returnTypeForMethodGetter(keyNumber: number, prevType: string): string {
	// The method function either returns the item in path (which should be a function)
	// or a "noop" function.
	return returnTypeForGetter(keyNumber, prevType, noopType.name);
}

function returnTypeForGetter(keyNumber: number, prevType: string, defaultType?: string): string {
	let successResult = `$ElementType<${prevType}, Key${keyNumber}>`;
	if (defaultType) {
		successResult = notNil(successResult);
	} else {
		defaultType = 'void';
	}
	return `: ${defaultType} | ` + successResult;
}

function* generatorForNth() {
	const withDefault = `DefaultValue | ${notNil('T')};`;
	const withoutDefault = 'void | T;';

	yield 'declare export function nth<T>(list: ?$ReadOnlyArray<T>, n: number): ' + withoutDefault;
	yield 'declare export function nthWithDefault<DefaultValue, T>' +
		'(defaultValue: DefaultValue, list: ?$ReadOnlyArray<T>, n: number): ' + withDefault;

	yield 'declare export function head<T>(list: ?$ReadOnlyArray<T>): ' + withoutDefault;
	yield 'declare export function headWithDefault<DefaultValue, T>' +
		'(defaultValue: DefaultValue, list: ?$ReadOnlyArray<T>): ' + withDefault;
}

export default function buildFlow() {
	const tabs = new TabsProvider();
	const br = '\n';

	const fileStart = [
		'// @flow',
		'type Prop = string | number;',
		`type ${noopType.name} = ${noopType.definition};`,
		'',
	];
	const generatedGetters = [false, true]
		.map(withDefaultValue => buildWith(generatorForGetters(tabs, withDefaultValue, false), tabs));
	const generatedNth = buildWith(generatorForNth(), tabs);
	const generatedMethodGetter = buildWith(generatorForGetters(tabs, false, true), tabs);

	const result = [
		...fileStart,
		...generatedGetters,
		generatedNth,
		generatedMethodGetter,
		`declare export var noop: ${noopType.name};`,
	].join(br);

	return writeFile(relativeToRoot('lib', 'index.js.flow'), result);
}
