import {execFile} from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const executableExtension = process.platform === 'win32' ? '.cmd' : '';
const testbed = path.join(__dirname, 'testbed');

const checkFlow = (configFilename: string): Promise<string> =>
	new Promise((resolve, reject) => execFile(
		path.join(ROOT_DIR, 'node_modules/.bin/flow' + executableExtension),
		`check --all`.split(' '),
		{
			cwd: testbed,
		},
		(error, stdout, stderr) => {
			if (error) {
				reject(stdout || stderr || error);
			} else {
				resolve(stdout);
			}
		},
	));

describe('Incorrect usage from Flow', () => {
	beforeAll(() => new Promise((resolve, reject) => {
		fs.copyFile(
			path.join(testbed, 'flowconfig.should-pass'),
			path.join(testbed, '.flowconfig'),
			err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			},
		);
	}));

	it('should typecheck', async () => {
		const result = await checkFlow('should-pass');
		expect(result.trim()).toBe('Found 0 errors');
	});
});
