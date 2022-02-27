'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const counters = new Map();

function increment (key = "kg") {
	const n = counters.get(key) || 0,
		result = n + 1;

	counters.set(key, result);

	return result;
}

function clone (arg) {
	return JSON.parse(JSON.stringify(arg));
}

const tpl = {name: "", children: []};

function crawl (arg = {}, data = []) {
	const result = clone(tpl);

	result.name = `${arg.id}: ${arg.label}`;
	result.children = arg.children.map(i => crawl(data.filter(di => di.id === i)[0], data));

	return result;
}

function sunburst (name = "", data = []) {
	const top = data.filter(i => i.parent.length === 0),
		layers = Array.from(new Set(top.reduce((a, v) => [...a, ...v.layer], []))),
		result = clone(tpl);

	result.name = name;
	result.children = layers.map(li => {
		const rli = clone(tpl);

		rli.name = li;
		rli.children = top.filter(ti => ti.layer.includes(li)).map(ti => crawl(ti, data));

		return rli;
	});

	return result;
}

const transforms = new Map([
	["sunburst", sunburst]
]);

class KidGolden {
	constructor (id = "", data = [{}], title = "", type = "") {
		this.id = id;
		this.data = data;
		this.done = false;
		this.output = null;
		this.title = title;
		this.type = type;

		return this;
	}

	process () {
		let result;

		try {
			this.output = transforms.get(this.type)(this.title, Array.isArray(this.data) ? this.data : [this.data]);
			this.done = true;
			result = true;
		} catch (err) {
			result = false;
		}

		this.data = null;

		return result;
	}
}

function kg ({data = [], id = `kg${increment()}`, title = "", type = ""} = {}) {
	return new KidGolden(id, data, title, type);
}

exports.kg = kg;
