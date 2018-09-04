import {method} from 'get-optional';
import {methodInput} from '../ts-interfaces';

const result: number | undefined = method(methodInput, 'a', 'b', 'c', 'fn')('Hello');
