import {createProgram} from './program';
import {Program} from 'typescript'

describe('TS type definitions for get function', () => {
	const basicInferenceTest = {
		should: 'infer the type correctly',
		source: `
			import {get} from 'safeget';

			type Input = {
				a: undefined | null | {
					b: {
						c: {
							d: {
								e: number
							}
						}
					}
				}
			}

			const input: Input = {
				a: { b: { c: { d: { e: 5 } } } }
			};
		`,
	}

	const propKeysToTest = 'abcd'.split('')
	const basicInferenceTestForAllDepths = propKeysToTest.map((c, i) => {
		const testedKeys = propKeysToTest.slice(0, i + 1)

		// Ensure that the inferred type of safeget(input, 'a') is the same as for input!.a
		const source =  basicInferenceTest.source + `
			const nativeAccessResult = input!.${testedKeys.join('!.')};
			const result: undefined | typeof nativeAccessResult =
				get(input, ${testedKeys.map(_ => `"${_}"`).join(', ')});
		`

		return {
			source,
			expect: [],
			should: basicInferenceTest.should + ' for input->' + testedKeys.join('->'),
		}
	})

	const tests = [
		...basicInferenceTestForAllDepths
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

			const diagnostics = program.getSemanticDiagnostics(src)
				.map(_ => _.messageText);

			expect(diagnostics).toEqual([]);
		})
	}
});
