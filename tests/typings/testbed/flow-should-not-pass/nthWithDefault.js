// @flow
import {nthWithDefault, get} from 'get-optional';
import {input} from '../flow-interfaces'
import type {A, B, C, D, E} from '../flow-interfaces';

class DefaultValue { }
const defaultValue = new DefaultValue();

const list = [1, 2, 3];
// Error: result can also be DefaultValue
const first: number = nthWithDefault(defaultValue, list, 0);

// Error: result can be a number, not a string
const nonExistent: DefaultValue | string = nthWithDefault(defaultValue, list, 100);
