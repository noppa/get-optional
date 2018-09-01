// @flow
import {nth, get} from 'get-optional';
import {input} from '../flow-interfaces'
import type {A, B, C, D, E} from '../flow-interfaces';

const list = [1, 2, 3];
const first: void | number = nth(list, 0);
const nonExistent: void | number = nth(list, 100);

const fromNullableList: void | boolean = nth(get(input, 'a', 'b', 'c', 'arr'), 0);
const fromNullableReadonlyList: void | boolean = nth(get(input, 'a', 'b', 'c', 'readonlyArr'), 0);
const noInferenceForT: void = nth(null, 5);
