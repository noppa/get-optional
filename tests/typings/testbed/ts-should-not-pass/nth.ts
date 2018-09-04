import {nth, get} from 'get-optional';
import {A, B, C, D, E, input} from '../ts-interfaces';

// Error: The result can also be undefined
const fromNullableList: boolean = nth(get(input, 'a', 'b', 'c', 'arr'), 0);

// Error: The result can be boolean, not string
const fromNullableReadonlyList: undefined | string = nth(get(input, 'a', 'b', 'c', 'readonlyArr'), 0);

// Error: input is not a list
const fromObject = nth(get(input, 'a', 'b'), 0);

// Error: the index argument '0' is not a number
const withStringIndex = nth([1, 2, 3], '0');
