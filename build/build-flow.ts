import {TabsProvider, writeFile, relativeToRoot} from './shared';

function* flowGenerator(tabs: TabsProvider) {
	yield '// @flow';
	yield 'declare export interface IGet {';

	tabs.indent();
	for (let i = 1; i < 6; i++) {
		const keyIndexes = [...Array(i)].map((_, idx) => idx + 1);
		let prevType = 'T';
		yield '<T,';

		tabs.indent();
		for (let ii = 0; ii < i; ii++) {
			const keyNumber = ii + 1;
			const prevIndexer = ii ? `[Key${ii}]` : '';
			prevType = `$NonMaybeType<${prevType + prevIndexer}>`;

			yield `Key${keyNumber}: $Keys<${prevType}>,`;
		}
		tabs.outdent();

		yield '>';

		tabs.indent();
		yield '(object: T, ' +
			keyIndexes
				.map(keyIdx => `key${keyIdx}: Key${keyIdx}`)
				.join(', ') +
			')';

		yield `: void | ${prevType}[Key${i}];`;
		tabs.outdent();
	}
	tabs.outdent();

	yield '}';
	yield 'declare export const get: IGet;';
}

export default function buildFlow() {
	const tabs = new TabsProvider();
	let result = '';
	for (const line of flowGenerator(tabs)) {
		result += tabs + line + '\n';
	}

	return writeFile(relativeToRoot('lib', 'index.flow'), result);
}
