import {get} from 'get-optional';
import {A, B, C, D, E, input} from '../ts-interfaces';

// Basic usage for all depths for get
const a: undefined | A = get(input, 'a');
const b: undefined | B = get(input, 'a', 'b');
const c: undefined | C = get(input, 'a', 'b', 'c');
const d: undefined | D = get(input, 'a', 'b', 'c', 'd');
const e: undefined | E = get(input, 'a', 'b', 'c', 'd', 'e');

const toFixed: undefined | typeof Number.prototype.toFixed = get(e, 'toFixed');

// Usage with record type & lists
declare const pollResults: {[area: string]: number[]};
const num: undefined | number = get(pollResults, 'Helsinki', 0);

class InputClass {
	a: number = 42;
}
const inputClass$a: undefined | number = get(new InputClass(), 'a');
