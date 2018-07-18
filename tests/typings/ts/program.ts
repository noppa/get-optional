import * as ts from 'typescript';
import {readFileSync} from 'fs';
import {join, dirname} from 'path';

type Code = string;

const scriptTarget = ts.ScriptTarget.ES2015;
const libFileName = 'lib.d.ts';
const libSource = readFileSync(
	join(dirname(require.resolve('typescript')), 'lib.d.ts'),
	'utf8',
);

const safegetSource = readFileSync(
	join(__dirname, '..', '..', '..', 'index.ts'),
	'utf8'
)

interface FileMap {
	[key: string]: Code;
}

const always = <T>(_: T) => (): T => _;
const noop = always(undefined);

function createProgram(testFileSources: FileMap) {
	const allSources: FileMap = {
		'lib.d.ts': libSource,
		'safeget.ts': safegetSource,
		...testFileSources,
	};

	const compilerHost: ts.CompilerHost = {
		getSourceFile(filename: string) {
			const fileContens = allSources[filename];
			if (!fileContens) {
				throw new Error(`No source file configured for file ${filename}`);
			}

			return ts.createSourceFile(filename, fileContens, scriptTarget);
		},

		getDefaultLibFileName: always(libFileName),
		writeFile: noop,
		useCaseSensitiveFileNames: always(false),
		getNewLine: always('\n'),
		getCurrentDirectory: always(''),
		getDirectories: always(['']),
		getCanonicalFileName: (p: string) => p,
		fileExists: always(true),
		readFile: always(''),
	};

	const program = ts.createProgram(
		Object.keys(testFileSources),
		{
			strict: true,
			target: scriptTarget,
		},
		compilerHost,
	);
	return program;
}

export {
	createProgram,
};
