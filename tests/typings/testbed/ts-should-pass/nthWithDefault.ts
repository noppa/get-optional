import {nthWithDefault, get} from 'get-optional';
import {input} from '../ts-interfaces';

class DefaultValue {
	kind: 'default value' = 'default value';
}
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

const noInferenceForT: {} =
	nthWithDefault(defaultValue, null, 5);
