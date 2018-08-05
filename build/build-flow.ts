import { TabsProvider, writeFile, relativeToRoot } from './shared';

const identity = <T>(_: T): T => _;

function* flowGenerator(tabs: TabsProvider) {
	yield '// @flow';
	yield 'type Prop = string|number';
	yield 'export interface IGet {';

	tabs.indent();
	for (let i = 1; i < 6; i++) {
		const keyIndexes = [...Array(i)].map((_, idx) => idx + 1);
		let prevType = 'T';
		yield '<T,';

		tabs.indent();
		for (let ii = 0; ii < i; ii++) {
			const keyNumber = ii + 1;
			const prevIndexer: (str: string) => string = ii
				? (_ => `$ElementType<${_}, Key${ii}>`)
				: identity;

			prevType = `$NonMaybeType<${prevIndexer(prevType)}>`;

			yield `Key${keyNumber}: Prop,`;
		}
		tabs.outdent();

		yield '>';

		tabs.indent();
		yield '(object: T, ' +
			keyIndexes
				.map(keyIdx => `key${keyIdx}: Key${keyIdx}`)
				.join(', ') +
			')';

		yield `: void | $ElementType<${prevType}, Key${i}>;`;
		tabs.outdent();
	}
	tabs.outdent();

	yield '}';
	yield 'declare export var get: IGet;';
}

export default function buildFlow() {
	const tabs = new TabsProvider();
	let result = '';
	for (const line of flowGenerator(tabs)) {
		result += tabs + line + '\n';
	}

	return writeFile(relativeToRoot('lib', 'index.js.flow'), result);
}
