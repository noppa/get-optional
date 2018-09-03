import { TabsProvider, writeFile, relativeToRoot } from './shared';
import { getter, buildWith } from './generators';

const notNil = (type: string) => `$NonMaybeType<${type}>`;

function* generatorForGetters(tabs: TabsProvider, withDefaultValue: boolean) {
	yield* getter(tabs, {
		withDefaultValue,
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
		returnType(keyNumber, prevType, defaultType) {
			let successResult = `$ElementType<${prevType}, Key${keyNumber}>`;
			if (defaultType) {
				successResult = notNil(successResult);
			} else {
				defaultType = 'void';
			}
			return `: ${defaultType} | ` + successResult;
		},
		exportVar(varname, typename) {
			return `declare export var ${varname}: ${typename}`;
		},
	});
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
	const fileStart = [
		'// @flow',
		'type Prop = string | number;',
		'',
	].join('\n');

	const generatedGetters = [false, true]
		.map(withDefaultValue => buildWith(generatorForGetters(tabs, withDefaultValue), tabs))
		.join('\n')
		+ '\n';

	const generatedNth = buildWith(generatorForNth(), tabs);

	const result = fileStart + generatedGetters + generatedNth;
	return writeFile(relativeToRoot('lib', 'index.js.flow'), result);
}
