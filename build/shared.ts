import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';

export const writeFile = promisify(fs.writeFile);
export const rootDir = path.join(__dirname, '..');
export const relativeToRoot = (...paths: string[]) => path.join(rootDir, ...paths);

export class TabsProvider {
	private i = 0;
	indent() {
		this.i++;
	}
	outdent() {
		this.i--;
		if (this.i === -1) {
			throw new Error('Indentation went to -1');
		}
	}
	toString() {
		return '\t'.repeat(this.i);
	}
}
