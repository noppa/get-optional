import {execFile} from 'child_process';
import {promisify} from 'util';
import * as path from 'path';

const checkTs = (configFilename: string) => new Promise((resolve, reject) => execFile(
	path.join(ROOT_DIR, 'node_modules/.bin/tsc.cmd'),
	`--noEmit --project ./${configFilename}.tsconfig.json`.split(' '),
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
	it('should typecheck', async () => {
		const result = await checkTs('should-pass');
		expect(result).toBe('');
	});
});

describe('Incorrect usage from TS', () => {
	it('should not typecheck', async () => {
		const result = checkTs('should-not-pass');
		await expect(result).rejects.toMatchSnapshot();
	});
});
