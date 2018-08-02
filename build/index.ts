import buildTs from './build-ts';
import buildFlow from './build-flow';

Promise.all([
	buildTs(),
	buildFlow(),
]).then((r) => {
	console.log(...r);
});
