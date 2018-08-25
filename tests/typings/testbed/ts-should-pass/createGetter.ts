import {createGetter} from 'safeget';
import {A, B, C, D, E, input} from '../ts-interfaces';

const getter = createGetter('a', 'b', 'c');

const c: C = getter(input);
