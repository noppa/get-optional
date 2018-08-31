const {Suite} = require('benchmark');
// @ts-ignore
global.currentImplementation = require('../../lib/index.js').get;

function setup() {
	const simpleInput = {a: 5};
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

function test() {
	// @ts-ignore
	currentImplementation({a: 5}, 'a');
	// @ts-ignore
	currentImplementation(complexInput, 'a', 'b', 'c', 'result');
}

const suite = new Suite('get');

suite
	.add('Current implementation', test, {setup})
	.on('error', function(err) {
		console.error(err);
	})
	.on('complete', function() {
		console.log(this.map(_ => _.toString()).join('\n'))
		console.log('Fastest is: ' + this.filter('fastest').map('name'))
	})
	.run({ async: true });
