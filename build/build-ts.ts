import {TabsProvider, writeFile, relativeToRoot} from './shared';
import { getter, buildWith } from './generators';

function* generatorForGetters(
	tabs: TabsProvider,
	withDefaultValue: boolean,
	getterFunctionFactory: boolean,
) {
	yield* getter(tabs, {
		withDefaultValue,
		getterFunctionFactory,
		prevIndexer(prevIndex, prevType) {
			const indexer = prevIndex > 0 ? `[Key${prevIndex}]` : '';
			return prevType + indexer;
		},
		notNil: type => `NonNullable<${type}>`,
		typeArgumentKeyN(keyNumber: number, prevType) {
			return `Key${keyNumber} extends keyof ${prevType}`;
		},
		returnType(keyNumber, prevType, defaultType = 'undefined') {
			return `${defaultType} | ${prevType}[Key${keyNumber}]`;
		},
		exportVar(varname, typename) {
			return `export const ${varname}: ${typename}`;
		},
	});
}

export default function buildTs() {
	const tabs = new TabsProvider();
	const result = [false, true]
		.map(withDefaultValue =>
			[false, true].map(getterFunctionFactory =>
				buildWith(generatorForGetters(tabs, withDefaultValue, getterFunctionFactory), tabs)).join('\n'))
		.join('\n');
	return writeFile(relativeToRoot('lib', 'index.d.ts'), result);
}
