import {execFile} from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const executableExtension = process.platform === 'win32' ? '.cmd' : '';
const testbed = path.join(__dirname, 'testbed');

const checkFlow = (testdir: string): Promise<string> => new Promise((resolve, reject) => {
	try {
		execFile(
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
		);
	} catch (err) {
		console.error(err);
		reject(err);
	}
});

describe('Flow type definitions', () => {
	// Flow can sometimes be a bit slow
	const flowTestTimeout = 60 * 1000;

	it('should typecheck for correct usage', () => {
		expect.assertions(1);
		const result = checkFlow('flow-should-pass').then(_ => _.trim());
		return expect(result).resolves.toBe('Found 0 errors');
	}, flowTestTimeout);

	it('should not typecheck for incorrect usage', () => {
		expect.assertions(1);
		const result = checkFlow('flow-should-not-pass');
		return expect(result).rejects.toMatchSnapshot();
	}, flowTestTimeout);
});
