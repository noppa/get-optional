import {execFile} from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const executableExtension = process.platform === 'win32' ? '.cmd' : '';
const testbed = path.join(__dirname, 'testbed');

const checkFlow = (testdir: string): Promise<string> =>
	new Promise((resolve, reject) => execFile(
		path.join(ROOT_DIR, 'node_modules/.bin/flow' + executableExtension),
		`check ${testdir} --all`.split(' '),
		{
			cwd: path.join(testbed),
		},
		(error, stdout, stderr) => {
			if (error) {
				reject(stdout || stderr || error);
			} else {
				resolve(stdout);
			}
		},
	));

describe('Correct usage from Flow', () => {
	it('should typecheck', () => {
		expect.assertions(1);
		const result = checkFlow('flow-should-pass').then(_ => _.trim());
		return expect(result).resolves.toBe('Found 0 errors');
	});
});

describe('Incorrect usage from Flow', () => {
	it('should not typecheck', () => {
		expect.assertions(1);
		const result = checkFlow('flow-should-not-pass');
		return expect(result).rejects.toMatchSnapshot();
	});
});
