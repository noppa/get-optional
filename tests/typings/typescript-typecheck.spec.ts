import {execFile} from 'child_process';
import * as path from 'path';

const executableExtension = process.platform === 'win32' ? '.cmd' : '';

const checkTs = (testdir: string) => new Promise((resolve, reject) => execFile(
	path.join(ROOT_DIR, 'node_modules/.bin/tsc' + executableExtension),
	`--noEmit --project ./ts-${testdir}/tsconfig.json`.split(' '),
	{
		cwd: path.join(__dirname, 'testbed'),
	},
	(error, stdout, stderr) => {
		if (error) {
			reject(stdout || stderr || error);
		} else {
			resolve(stdout);
		}
	},
));

describe('Correct usage from TS', () => {
	it('should typecheck', () => {
		expect.assertions(1);
		const result = checkTs('should-pass');
		return expect(result).resolves.toBe('');
	});
});

describe('Incorrect usage from TS', () => {
	it('should not typecheck', () => {
		expect.assertions(1);
		const result = checkTs('should-not-pass');
		return expect(result).rejects.toMatchSnapshot();
	});
});
