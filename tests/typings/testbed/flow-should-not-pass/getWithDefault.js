// @flow
import {getWithDefault} from 'get-optional';
import {input} from '../flow-interfaces';
import type {A, B, C, D, E} from '../flow-interfaces';

// Error, because the result can also be bDefault
const c: C = getWithDefault(bDefault, input, 'a', 'b', 'c');

declare var bDefault: B;
// Error, because property "c" is not in "a"
const b = getWithDefault(bDefault, input, 'a', 'c');
