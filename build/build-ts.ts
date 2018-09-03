import {TabsProvider, writeFile, relativeToRoot} from './shared';
import { getter, buildWith } from './generators';

const notNil = (type: string) => `NonNullable<${type}>`;

function* generatorForGetters(tabs: TabsProvider, withDefaultValue: boolean) {
	yield* getter(tabs, {
		notNil,
		withDefaultValue,
		prevIndexer(prevIndex, prevType) {
			const indexer = prevIndex > 0 ? `[Key${prevIndex}]` : '';
			return prevType + indexer;
		},
		typeArgumentKeyN(keyNumber: number, prevType) {
			return `Key${keyNumber} extends keyof ${prevType}`;
		},
		returnType(keyNumber, prevType, defaultType) {
			let successType = `${prevType}[Key${keyNumber}]`;
			if (defaultType) {
				successType = notNil(successType);
			} else {
				defaultType = 'undefined';
			}

			return `: ${defaultType} | ` + successType;
		},
		exportVar(varname, typename) {
			return `export const ${varname}: ${typename}`;
		},
	});
}

function* generatorForNth() {
	const withDefault = `DefaultValue | ${notNil('T')};`;
	const withoutDefault = 'undefined | T;';

	yield 'export function nth<T>(list: null | undefined | ReadonlyArray<T>, n: number): ' + withoutDefault;
	yield 'export function nthWithDefault<DefaultValue, T>' +
		'(defaultValue: DefaultValue, list: null | undefined | ReadonlyArray<T>, n: number): ' + withDefault;

	yield 'export function head<T>(list: null | undefined | ReadonlyArray<T>): ' + withoutDefault;
	yield 'export function headWithDefault<DefaultValue, T>' +
		'(defaultValue: DefaultValue, list: null | undefined | ReadonlyArray<T>): ' + withDefault;
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
