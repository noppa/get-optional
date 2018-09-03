// @flow
import {get} from 'get-optional';
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
const num: void | number = get(pollResults, 'Helsinki', 0);

// There is no possibility of "a" being a valid key of null, but
// Flow allows this call anyway and infers return type to be void.
const fromNull: void = get(null, 'a');

// Some sort of workaround for cases where input is a class.
// NOTE: Does not allow accessing inputInstance.self.value :(
const inputInstance = new InputClass();
const inputClassValue: void | number = get((inputInstance: $ReadOnly<InputClass>), 'value');
