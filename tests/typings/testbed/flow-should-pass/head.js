// @flow
import {head, get} from 'get-optional';
import {input} from '../flow-interfaces'
import type {A, B, C, D, E} from '../flow-interfaces';

const list = [1, 2, 3];
const first: void | number = head(list);
const nonExistent: void | number = head(([]: number[]));

const fromNullableList: void | boolean = head(get(input, 'a', 'b', 'c', 'arr'));
const fromNullableReadonlyList: void | boolean = head(get(input, 'a', 'b', 'c', 'readonlyArr'));
const noInferenceForT: void = head(null);
