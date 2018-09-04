// @flow
import {method} from 'get-optional';
import {methodInput} from '../flow-interfaces.js';

// Error: The returned function accepts string, not number.
const wrongInput: number | void = method(methodInput, 'a', 'b', 'c', 'fn')(42);

// Error: The returned function can also return undefined.
const noUndef: number = method(methodInput, 'a', 'b', 'c', 'fn')('Hello');

// Error: The returned function can return number, not boolean.
const wrongOutput: string | void = method(methodInput, 'a', 'b', 'c', 'fn')('Hello');
