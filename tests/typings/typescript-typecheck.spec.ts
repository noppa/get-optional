import { execFile } from 'child_process';
import * as path from 'path';

const executableExtension = process.platform === 'win32' ? '.cmd' : '';

const checkTs = (testdir: string) => new Promise((resolve, reject) => {
	try {
		execFile(
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
		);
	} catch (err) {
		console.error(err);
		reject(err);
	}
});

describe('Typescript type definitions', () => {
	it('should typecheck for correct usage', () => {
		expect.assertions(1);
		const result = checkTs('should-pass');
		return expect(result).resolves.toBe('');
	});

	it('should not typecheck for incorrect usage', () => {
		expect.assertions(1);
		const result = checkTs('should-not-pass');
		return expect(result).rejects.toMatchSnapshot();
	});
});
