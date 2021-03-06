// @flow
import {nth, get} from 'get-optional';
import {input} from '../flow-interfaces'
import type {A, B, C, D, E} from '../flow-interfaces';

const list = [1, 2, 3];
const first: void | number = nth(list, 0);
const nonExistent: void | number = nth(list, 100);

// Error: The result can also be void
const fromNullableList: boolean = nth(get(input, 'a', 'b', 'c', 'arr'), 0);

// Error: The result can be boolean, not string
const fromNullableReadonlyList: void | string = nth(get(input, 'a', 'b', 'c', 'readonlyArr'), 0);

// Error: input is not a list
const fromObject = nth(get(input, 'a', 'b'), 0);

// Error: the index argument '0' is not a number
const withStringIndex = nth([1, 2, 3], '0');
