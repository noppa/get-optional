import {get} from 'get-optional';
import {A, B, C, D, E, input} from '../ts-interfaces';

// Error: The result can also be undefined
const c: C = get(input, 'a', 'b', 'c');

// Error: Property "c" is not in "a"
const b = get(input, 'a', 'c');

// Error: There is no possibility of "a" being a valid key of null
const fromNull = get(null, 'a');
