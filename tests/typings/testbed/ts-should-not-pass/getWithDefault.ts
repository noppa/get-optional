import {getWithDefault} from 'safeget';
import {A, B, C, D, E, input} from '../ts-interfaces';

// Error: The result can also be bDefault
const c: C = getWithDefault(bDefault, input, 'a', 'b', 'c');

declare const bDefault: B;
// Error: Property "c" is not in "a"
const b = getWithDefault(bDefault, input, 'a', 'c');
