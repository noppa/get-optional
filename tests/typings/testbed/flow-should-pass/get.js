// @flow
import {get} from 'safeget';
import {input, InputClass} from '../flow-interfaces';
import type {A, B, C, D, E} from '../flow-interfaces';

// Basic usage for all depths
const a: void | A = get(input, 'a');
const b: void | B = get(input, 'a', 'b');
const c: void | C = get(input, 'a', 'b', 'c');
const d: void | D = get(input, 'a', 'b', 'c', 'd');
const e: void | E = get(input, 'a', 'b', 'c', 'd', 'e');

// Usage with record type & lists
declare var pollResults: {[area: string]: number[]};
const num: void | number[] = get(pollResults, 'Helsinki');

const inputClassValue: void | number = get(new InputClass(), 'self', 'self', 'value');
