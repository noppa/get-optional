import {nth, get} from 'safeget';
import {A, B, C, D, E, input} from '../ts-interfaces';

const list = [1, 2, 3];
const first: undefined | number = nth(list, 0);
const nonExistent: undefined | number = nth(list, 100);

const fromNullableList: undefined | boolean = nth(get(input, 'a', 'b', 'c', 'arr'), 0);
const fromNullableReadonlyList: undefined | boolean = nth(get(input, 'a', 'b', 'c', 'readonlyArr'), 0);
const noInferenceForT: undefined = nth(null, 5);
