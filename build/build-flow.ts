import { TabsProvider, writeFile, relativeToRoot } from './shared';
import { getter, buildWith } from './generators';

function* generatorForGetters(tabs: TabsProvider, withDefaultValue: boolean) {
	yield* getter(tabs, {
		withDefaultValue,
		prevIndexer(prevIndex, prevType) {
			return prevIndex > 0
				? `$ElementType<$ReadOnly<${prevType}>, Key${prevIndex}>`
				: prevType;
		},
		notNil: type => `$NonMaybeType<${type}>`,
		typeArgumentKeyN(keyNumber) {
			const typeRestriction = keyNumber === 1
				? '$Keys<$ReadOnly<$NonMaybeType<T>>>'
				: 'Prop';
			return `Key${keyNumber}: ${typeRestriction}`;
		},
		returnType(keyNumber, prevType, defaultType = 'void') {
			return `: ${defaultType} | $ElementType<$ReadOnly<${prevType}>, Key${keyNumber}>`;
		},
		exportVar(varname, typename) {
			return `declare export var ${varname}: ${typename}`;
		},
	});
}

export default function buildFlow() {
	const tabs = new TabsProvider();
	const fileStart = [
		'// @flow',
		'type Prop = string | number;',
		'',
	].join('\n');
	const generated = [false, true]
		.map(withDefaultValue => buildWith(generatorForGetters(tabs, withDefaultValue), tabs))
		.join('\n');

	const result = fileStart + generated;
	return writeFile(relativeToRoot('lib', 'index.js.flow'), result);
}
