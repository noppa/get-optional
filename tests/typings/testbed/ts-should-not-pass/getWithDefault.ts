import {getWithDefault} from 'safeget';
import {A, B, C, D, E, input} from '../ts-interfaces';

// Error, because the result can also be bDefault
const c: C = getWithDefault(bDefault, input, 'a', 'b', 'c');

declare const bDefault: B;
// Error, because property "c" is not in "a"
const b = getWithDefault(bDefault, input, 'a', 'c');
