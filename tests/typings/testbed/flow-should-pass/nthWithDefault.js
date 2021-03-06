// @flow
import {nthWithDefault, get} from 'get-optional';
import {input} from '../flow-interfaces'
import type {A, B, C, D, E} from '../flow-interfaces';

class DefaultValue {}
const defaultValue = new DefaultValue();

const list = [1, 2, 3];
const first: DefaultValue | number =
	nthWithDefault(defaultValue, list, 0);

const nonExistent: DefaultValue | number =
	nthWithDefault(defaultValue, list, 100);


const fromNullableList: DefaultValue | boolean =
	nthWithDefault(defaultValue, get(input, 'a', 'b', 'c', 'arr'), 0);

const fromNullableReadonlyList: DefaultValue | boolean =
	nthWithDefault(defaultValue, get(input, 'a', 'b', 'c', 'readonlyArr'), 0);

const noInferenceForT: DefaultValue =
	nthWithDefault(defaultValue, null, 5);
