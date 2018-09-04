import {nthWithDefault, get} from 'get-optional';
import {input} from '../ts-interfaces';

class DefaultValue {
	kind: 'default value' = 'default value';
}
const defaultValue = new DefaultValue();

const list = [1, 2, 3];
// Error: result can also be DefaultValue
const first: number = nthWithDefault(defaultValue, list, 0);

// Error: result can be a number, not a string
const nonExistent: DefaultValue | string = nthWithDefault(defaultValue, list, 100);

// Known limitation, does work in Flow
const noInferenceForT: DefaultValue = nthWithDefault(defaultValue, null, 5);
