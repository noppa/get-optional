import {head, get} from 'safeget';
import {A, B, C, D, E, input} from '../ts-interfaces';

const list = [1, 2, 3];
const first: undefined | number = head(list);
const nonExistent: undefined | number = head(([] as number[]));

const fromNullableList: undefined | boolean = head(get(input, 'a', 'b', 'c', 'arr'));
const fromNullableReadonlyList: undefined | boolean = head(get(input, 'a', 'b', 'c', 'readonlyArr'));
const noInferenceForT: undefined = head(null);
