import buildTs from './build-ts';

Promise.all([
	buildTs(),
]).then((r) => {
	console.log(...r);
});
