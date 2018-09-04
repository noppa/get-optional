import {method} from 'get-optional';
import {methodInput} from '../ts-interfaces';

// Error: The returned function accepts string, not number.
const wrongInput: number | undefined = method(methodInput, 'a', 'b', 'c', 'fn')(42);

// Error: The returned function can also return undefined.
const noUndef: number = method(methodInput, 'a', 'b', 'c', 'fn')('Hello');

// Error: The returned function can return number, not boolean.
const wrongOutput: string | undefined = method(methodInput, 'a', 'b', 'c', 'fn')('Hello');
