import {getWithDefault} from 'safeget';
import {A, B, C, D, E, input} from '../ts-interfaces';

interface SomeType {
	_kind: 'foobar';
}

// Basic usage for all depths
const a: null | A = getWithDefault(input, null, 'a');
const b: number | B = geWithDefaultt(input, 5, 'a', 'b');
const c: 'test' | C = getWithDefault(input, 'test', 'a', 'b', 'c');
const d: SomeType | D = getWithDefault(input, { _kind: 'foobar' }, 'a', 'b', 'c', 'd');
const e: E = getWithDefault(input, 42, 'a', 'b', 'c', 'd', 'e');

const toFixed: undefined | typeof Number.prototype.toFixed = getWithDefault(e, undefined, 'toFixed');
