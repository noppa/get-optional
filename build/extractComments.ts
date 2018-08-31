
// Bunch of hacky scripts to get the documentation comments from index.js.

import {promisify} from 'util';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import * as safeget from '../lib/index.js';

const pathToLibFile = (filename: string) => path.join(__dirname, '../lib', filename);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const br = '\n';
const readLibFile = (filename: string) => readFile(pathToLibFile(filename), 'utf8');

interface SignatureInfo {
	name: string;
	signature: string;
	codeExample: null | string;
	docs: string;
	// Documentation without code example
	docDescription: string;
}

function* parseSignatures(code: string): Iterable<SignatureInfo> {
	const parserRegex = /\/\*\*(.*?)function ([a-zA-Z0-9]+)\(([a-zA-Z0-9, ]+)\) {/sg;
	let functionDefinition: null | string[];
	const nonEmptyCommentLineRegex = /[^/* \r]/;

	// tslint:disable-next-line:no-conditional-assignment
	while (functionDefinition = parserRegex.exec(code)) {
		const [, docs, name, params] = functionDefinition;

		let parsedDocs = docs
			.split(br)
			.filter(_ => nonEmptyCommentLineRegex.test(_))
			.map(_ => _.replace(/^[/ *]*/, '').trim())
			.join(br);

		const example = parsedDocs.match(/@example\s*```(?:javascript)?(.*)```/s);
		let codeExample: null | string = null;
		let docDescription = parsedDocs;
		if (example) {
			codeExample = example[1];
			docDescription = docDescription
				.replace(example[0], '');
		}

		parsedDocs = parsedDocs.split(br).filter(_ => !/@[a-zA-Z]+/.test(_)).join(br);

		const signature = `${name}(${params})`;

		yield {
			name,
			signature,
			codeExample,
			docDescription,
			docs: parsedDocs,
		};
	}
}

// Checks that the code example actually works
function assertCodeExampleCorrectness(code: string, allowedFunctions: string[]) {
	const assertionReg = /\/\/\s?=>\s?(.*)/; // Matches a string "// => foo"
	const expectedResults: any[] = [];
	for (const line of code.split(br)) {
		const match = line.match(assertionReg);
		if (match) {
			const [assertionComment, expectedResultStr] = match;
			const expectedResult = new Function('return ' + expectedResultStr)();
			expectedResults.push(expectedResult);
		}
	}

	const functionImplementations = allowedFunctions.map((fnName: string) => {
		return function wrappedSafegetFunction(...args: any[]) {
			// tslint:disable-next-line:ban-types
			const fn: Function = (safeget as any)[fnName] as any;
			const result = fn(...args);
			const expectedResult = expectedResults.shift();

			console.assert(
				result === expectedResult,
				`Expected ${fnName} to return ${stringify(expectedResult)}, but it returned ${stringify(result)}`);

			return result;
		};
	});

	new Function(...allowedFunctions, code)(...functionImplementations);
}

export async function extractSignaturesFromIndexJs(): Promise<SignatureInfo[]> {
	const file = await readLibFile('index.js');
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	const question = (q: string): Promise<string> => new Promise((resolve, reject) => {
		rl.question(q, resolve);
	});
	const skipTests = process.argv.includes('--skip-tests');

	const results = [];
	try {
		// Test all code examples to make sure that we don't have misleading info in documentation.
		for (const declaration of parseSignatures(file)) {
			const {codeExample} = declaration;
			if (!skipTests && codeExample) {
				console.log(`\nTesting documentation example for ${declaration.name}...`);
				console.log('The test code looks like this:', '\n' + codeExample + '\n');
				const answer = await question('Is it ok to execute that code? [Y/n]');
				if (!/no?/i.test(answer)) {
					assertCodeExampleCorrectness(codeExample, [declaration.name]);
					console.log('Example OK.');
				} else {
					return Promise.reject('Didn\'t get permission to run tests. Operation cancelled.');
				}
			}
			results.push(declaration);
		}
	} finally {
		rl.close();
	}
	return results;
}

function stringify(value: any) {
	return value === undefined ? 'undefined' : JSON.stringify(value);
}

function markdownCode(codeStr: string) {
	return '`' + codeStr + '`';
}

if (require.main === module) {
	// This file was called directly as a script, print documentation.
	extractSignaturesFromIndexJs().then(docs =>
		console.log(docs.map(_ => markdownCode(_.signature) + br + _.docs).join(br + br)));
}
