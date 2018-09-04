const Benchmark = require('benchmark');
const {sortBy} = require('lodash');
const {Suite} = Benchmark;

global.get$getOptional_v1 = require('./old_implementations/old_v1.js').get;
global.get$getOptional_v1_0_3 = require('./old_implementations/old_v1.0.3.js').get;
global.get$getOptional = require('../../lib/index.js').get;
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
	result$simple = get$getOptional_v1(simpleInput, 'a');
	result$complex = get$getOptional_v1(complexInput, 'a', 'b', 'c', 'result');
}

function v1_0_3Test() {
	result$simple = get$getOptional_v1_0_3(simpleInput, 'a');
	result$complex = get$getOptional_v1_0_3(complexInput, 'a', 'b', 'c', 'result');
}

function getOptionalTest() {
	result$simple = get$getOptional(simpleInput, 'a');
	result$complex = get$getOptional(complexInput, 'a', 'b', 'c', 'result');
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
	.add('Safeget (old version 1)', v1Test, { setup, teardown, })
	.add('Safeget (old version 1.0.3)', v1_0_3Test, { setup, teardown, })
	.add('Safeget (current version)', getOptionalTest, { setup, teardown, })
	.add('Lodash', lodashTest, { setup, teardown, })
	.on('error', function({target}) {
		console.error(`Benchmark for ${target.name} failed with error `, target.error);
	})
	.on('complete', function() {
		console.log(sortBy(this, 'hz').map(_ => _.toString()).join('\n'))
		console.log('Fastest is: ' + this.filter('fastest').map('name'))
	})
	.run({ async: false, defer: false });
