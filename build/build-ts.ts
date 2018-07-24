import {TabsProvider, writeFile, relativeToRoot} from './shared';

function* tsGenerator(tabs: TabsProvider) {
	yield 'declare module "safeget" {';

	tabs.indent();
	yield 'export interface IGet {';

	tabs.indent();
	for (let i = 1; i < 6; i++) {
		const keyIndexes = [...Array(i)].map((_, idx) => idx + 1);
		let prevType = 'T';
		yield '<T,';

		tabs.indent();
		for (let ii = 0; ii < i; ii++) {
			const keyNumber = ii + 1;
			const prevIndexer = ii ? `[Key${ii}]` : '';
			prevType = `NonNullable<${prevType + prevIndexer}>`;

			yield `Key${keyNumber} extends keyof ${prevType},`;
		}
		tabs.outdent();

		yield '>';

		tabs.indent();
		yield '(object: T, ' +
			keyIndexes
				.map(keyIdx => `key${keyIdx}: Key${keyIdx}`)
				.join(', ') +
			')';

		yield `: undefined | ${prevType}[Key${i}];`;
		tabs.outdent();
	}
	tabs.outdent();

	yield '}';
	yield 'export const get: IGet;';
	tabs.outdent();

	yield '}';
}

export default function buildTs() {
	const tabs = new TabsProvider();
	let result = '';
	for (const line of tsGenerator(tabs)) {
		result += tabs + line + '\n';
	}

	return writeFile(relativeToRoot('lib', 'index.d.ts'), result);
}
