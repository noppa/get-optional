import {TabsProvider, writeFile, relativeToRoot} from './shared';
import { getter, buildWith } from './generators';

function* generatorForGetters(tabs: TabsProvider, withDefaultValue: boolean) {
	yield* getter(tabs, {
		withDefaultValue,
		prevIndexer(prevIndex, prevType) {
			const indexer = prevIndex > 0 ? `[Key${prevIndex}]` : '';
			return prevType + indexer;
		},
		notNil: type => `NonNullable<${type}>`,
		typeArgumentKeyN(keyNumber: number, prevType) {
			return `Key${keyNumber} extends keyof ${prevType}`;
		},
		returnType(keyNumber, prevType, defaultType = 'undefined') {
			return `: ${defaultType} | ${prevType}[Key${keyNumber}]`;
		},
		exportVar(varname, typename) {
			return `export const ${varname}: ${typename}`;
		},
	});
}

function* generatorForNth() {
	yield `export function nth<T>(list: null | undefined | ReadonlyArray<T>, n: number): undefined | T;`;
	yield 'export function nthWithDefault<DefaultValue, T>' +
		'(list: null | undefined | ReadonlyArray<T>, n: number): undefined | T;';

	yield `export function head<T>(list: null | undefined | ReadonlyArray<T>): undefined | T;`;
	yield 'export function headWithDefault<DefaultValue, T>' +
		'(list: null | undefined | ReadonlyArray<T>): undefined | T;';
}

export default function buildTs() {
	const tabs = new TabsProvider();
	const result = [false, true]
		.map(withDefaultValue => buildWith(generatorForGetters(tabs, withDefaultValue), tabs))
		.join('\n')
		+ '\n'
		+ buildWith(generatorForNth(), tabs);

	return writeFile(relativeToRoot('lib', 'index.d.ts'), result);
}
