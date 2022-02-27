"use strict";

import {clone} from "../clone";

const tpl = {name: "", children: []};

function crawl (arg = {}, data = []) {
	const result = clone(tpl);

	result.name = `${arg.id}: ${arg.label}`;
	result.children = arg.children.map(i => crawl(data.filter(di => di.id === i)[0], data));

	return result;
}

function sunburst (name = "", data = []) {
	const top = data.filter(i => i.parent.length === 0),
		layers = Array.from(new Set(top.reduce((a, v) => [...a, ...v.layer], [])));

	return layers.map(li => {
		const result = clone(tpl);

		result.name = li;
		result.children = top.filter(ti => ti.layer.includes(li)).map(ti => crawl(ti, data));

		return result;
	});
}

export {sunburst};
