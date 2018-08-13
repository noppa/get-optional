import {get} from 'safeget';
import {A, B, C, D, E, input} from '../ts-interfaces';

// Error, because the result can also be undefined
const c: C = get(input, 'a', 'b', 'c');

// Error, because property "c" is not in "a"
const b = get(input, 'a', 'c');
