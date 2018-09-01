// @flow
import {getWithDefault} from 'get-optional';
import {input} from '../flow-interfaces';
import type {A, B, C, D, E} from '../flow-interfaces';

interface SomeType {
	_kind: string;
}

// Basic usage for all depths
const a: null | A = getWithDefault(null, input, 'a');
const b: number | B = getWithDefault(5, input, 'a', 'b');
const c: 'test' | C = getWithDefault('test', input, 'a', 'b', 'c');
const d: SomeType | D = getWithDefault({ _kind: 'foobar' }, input, 'a', 'b', 'c', 'd');
const e: E = getWithDefault(42, input, 'a', 'b', 'c', 'd', 'e');
