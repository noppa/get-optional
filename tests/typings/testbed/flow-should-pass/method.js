// @flow
import {method} from 'get-optional';
import {methodInput} from '../flow-interfaces.js';

const result: number | void = method(methodInput, 'a', 'b', 'c', 'fn')('Hello');

