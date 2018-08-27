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

function* generatorForNth(tabs: TabsProvider) {
	yield `export function nth<T>(list: $ReadOnlyArray<T>, n: number): void | T;`;
	yield 'export function nthWithDefault<';
	tabs.indent();
	yield 'DefaultValue,';
	yield 'T>';
	yield '(list: $ReadOnlyArray<T>, n: number): void | T;';
	tabs.outdent();
}

export default function buildTs() {
	const tabs = new TabsProvider();
	const result = [false, true]
		.map(withDefaultValue => buildWith(generatorForGetters(tabs, withDefaultValue), tabs))
		.join('\n')
		+ buildWith(generatorForNth(tabs), tabs);

	return writeFile(relativeToRoot('lib', 'index.d.ts'), result);
}
