import {createProgram} from './program';
import {Program} from 'typescript'

describe('TS type definitions for get function', () => {
	const tests = [
		{
			should: 'infer the type correctly',
			source: `
				import {get} from 'safeget';

				type Input = {
					a: undefined | null | {
						b: {
							c: number,
						}
					}
				}

				const input: Input = {
					a: { b: { c: 5 } }
				};

				const result: number = get(input, 'a', 'b', 'c');
			`,
			expect: []
		}
	];

	const filenameForTest = (testname: string) => testname.replace(/ /g, '_') + '.ts';

	let program: Program;
	beforeAll(() => {
		const testFileConfig: Record<string, string> = {}
		for(const test of tests) {
			const filename = filenameForTest(test.should);
			testFileConfig[filename] = test.source;
		}
		program = createProgram(testFileConfig)
	});

	for (const test of tests) {
		it('should ' + test.should, () => {
			const src = program.getSourceFile(filenameForTest(test.should));
			const diagnostics = program.getSemanticDiagnostics(src);
			expect(diagnostics).toEqual(test.expect);
		})
	}
});
