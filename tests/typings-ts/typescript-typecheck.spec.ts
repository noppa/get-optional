import {execFile} from 'child_process';
import {promisify} from 'util';
import * as path from 'path';

const checkTs = () => new Promise((resolve, reject) => execFile(
	path.join(ROOT_DIR, 'node_modules/.bin/tsc.cmd'),
	'--noEmit --project ./should-pass.tsconfig.json'.split(' '),
	{
		cwd: path.join(__dirname, 'testbed'),
	},
	(error, stdout, stderr) => {
		if (error) {
			reject(stderr || stdout || error);
		} else {
			resolve(stdout);
		}
	},
));

describe('Correct usage from TS', () => {
	it('should typecheck', async () => {
		const result = await checkTs();
		expect(result).toBe('');
	});
});
