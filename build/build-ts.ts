import {TabsProvider, writeFile, relativeToRoot} from './shared';

function* tsGenerator(tabs: TabsProvider) {
	// Signature for the "get" function.
	yield* getGenerator(tabs, false);
	yield '';
	// Signature for the "getWithDefault" function.
	yield* getGenerator(tabs, true);
}

function* getGenerator(tabs: TabsProvider, withDefaultValue: boolean) {
	const functionNameSuffix = withDefaultValue ? 'WithDefault' : '';

	yield `export interface IGet${functionNameSuffix} {`;

	tabs.indent();
	// Run through all the 5 overloads of this function, generating one signature for each.
	for (let i = 1; i < 6; i++) {
		const keyIndexes = [...Array(i)].map((_, idx) => idx + 1);
		let prevType = 'T';

		// Generic type arguments list starts.
		yield '<T,';
		tabs.indent();

		if (withDefaultValue) {
			yield 'DefaultValue,';
		}

		for (let ii = 0; ii < i; ii++) {
			const keyNumber = ii + 1;
			const prevIndexer = ii ? `[Key${ii}]` : '';
			prevType = `NonNullable<${prevType + prevIndexer}>`;

			// Declare a type argument with name KeyN that is one of the property names
			// in previous type argument, KeyN-1 (assuming KeyN-1 isn't nullish).
			yield `Key${keyNumber} extends keyof ${prevType},`;
		}
		tabs.outdent();
		yield '>'; // Generic type arguments list ends.

		// Arguments list starts.
		tabs.indent();
		yield '(object: T, ' +
			(withDefaultValue ? 'defaultValue: DefaultValue, ' : '') +
			keyIndexes
				.map(keyIdx => `key${keyIdx}: Key${keyIdx}`)
				.join(', ') +
			')';

		yield `: ${withDefaultValue ? 'DefaultValue' : undefined} | ${prevType}[Key${i}];`;
		tabs.outdent();
	}
	tabs.outdent();

	yield '}\n';
	yield `export const get${functionNameSuffix}: IGet${functionNameSuffix};`;
}

export default function buildTs() {
	const tabs = new TabsProvider();
	let result = '';
	for (const line of tsGenerator(tabs)) {
		result += tabs + line + '\n';
	}

	return writeFile(relativeToRoot('lib', 'index.d.ts'), result);
}
