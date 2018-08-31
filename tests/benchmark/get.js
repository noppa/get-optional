const Benchmark = require('benchmark');
const {Suite} = Benchmark;

global.get$v1 = require('../../lib/index.js').get;
global.get$lodash = require('lodash/get');

function setup() {
	let result$simple, result$complex;
	const simpleInput = {a: 42};
	const complexInput = {
		a: {
			b: {
				c: {
					other: 5,
					result: 'foobar'
				}
			},
			someMethod() {
				return 42;
			}
		}
	}
}

function v1Test() {
	result$simple = get$v1(simpleInput, 'a');
	result$complex = get$v1(complexInput, 'a', 'b', 'c', 'result');
}

function lodashTest() {
	result$simple = get$lodash(simpleInput, ['a']);
	result$complex = get$lodash(complexInput, ['a', 'b', 'c', 'result']);
}

function teardown() {
	console.assert(result$simple === 42, 'Test failed with simple input, got ' + result$simple);
	console.assert(result$complex === 'foobar', 'Test failed with complex input, got ' + JSON.stringify(result$complex));
}

const suite = new Suite('get');

suite
	.add('version 1', v1Test, { setup, teardown, })
	.add('lodash', lodashTest, { setup, teardown, })
	.on('error', function({target}) {
		console.error(`Benchmark for ${target.name} failed with error `, target.error);
	})
	.on('complete', function() {
		console.log(this.map(_ => _.toString()).join('\n'))
		console.log('Fastest is: ' + this.filter('fastest').map('name'))
	})
	.run({ async: true });
