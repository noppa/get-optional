import { TabsProvider } from './shared';

interface BaseConfig {
	withDefaultValue: boolean;
	returnType(keyNumber: number, prevType: string, defaultType: undefined | string): string;
}

interface GetterConfig extends BaseConfig {
	prevIndexer(prevIndex: number, pervType: string): string;
	notNil(type: string): string;
	typeArgumentKeyN(keyNumber: number, prevType: string): string;
	exportVar(varname: string, typename: string): string;
}

function* getter(tabs: TabsProvider, config: GetterConfig): Iterable<string> {
	const {
		withDefaultValue,
		prevIndexer,
		notNil,
		typeArgumentKeyN,
		returnType,
		exportVar,
	} = config;

	const functionNameSuffix = withDefaultValue ? 'WithDefault' : '';
	yield `export interface Getter${functionNameSuffix} {`;

	tabs.indent();
	// Run through all the 5 overloads of this function, generating one signature for each.
	for (let i = 1; i < 6; i++) {
		const keyIndexes = [...Array(i)].map((_, idx) => idx + 1);
		let prevType = 'T';

		// Generic type arguments list starts.
		if (withDefaultValue) {
			yield '<DefaultValue,';
			tabs.indent();
			yield 'T,';
		} else {
			yield '<T,';
			tabs.indent();
		}

		for (let ii = 0; ii < i; ii++) {
			const keyNumber = ii + 1;
			prevType = notNil(prevIndexer(ii, prevType));

			// Declare a type argument with name KeyN that is one of the property names
			// in previous type argument, KeyN-1 (assuming KeyN-1 isn't nullish).
			yield typeArgumentKeyN(keyNumber, prevType) + ',';
		}
		tabs.outdent();
		yield '>'; // Generic type arguments list ends.

		// Arguments list starts.
		tabs.indent();
		yield '(' +
			(withDefaultValue ? 'defaultValue: DefaultValue, ' : '') +
			'object: T, ' +
			keyIndexes
				.map(keyIdx => `key${keyIdx}: Key${keyIdx}`)
				.join(', ') +
			')';

		yield returnType(i, prevType, withDefaultValue ? 'DefaultValue' : undefined) + ';';
		tabs.outdent();
	}
	tabs.outdent();

	yield '}\n';
	yield exportVar('get' + functionNameSuffix, 'Getter' + functionNameSuffix) + ';';
}

function buildWith(
	codeGenIterable: Iterable<string>,
	tabs: TabsProvider,
): string {
	let result = '';
	for (const line of codeGenIterable) {
		result += tabs + line + '\n';
	}
	return result;
}

export {
	getter,
	buildWith,
};
