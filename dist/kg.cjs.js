'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const counters = new Map();

function increment (key = "kg") {
	const n = counters.get(key) || 0,
		result = n + 1;

	counters.set(key, result);

	return result;
}

const labels$1 = {
	"INIT": "Initialization",
	"END": "End",
	"REQUIRED": "Required",
	"REQUIRES": "{{a}} requires {{b}}",
	"RELATES": "{{a}} relates to {{b}} via {{c}}",
	"START": "Start of {{a}}",
	"STARTS": "{{a}} starts {{b}}"
};

const labels = new Map([
	["en-US", labels$1]
]);

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
		layers = Array.from(new Set(top.reduce((a, v) => [...a, ...v.layer], [])));

	return layers.map(li => {
		const result = clone(tpl);

		result.name = li;
		result.children = top.filter(ti => ti.layer.includes(li)).map(ti => crawl(ti, data));

		return result;
	});
}

const transforms = new Map([
	["sunburst", sunburst]
]);

class KidGolden {
	constructor (id = "", data = [{}], lang = "en-US", title = "", type = "") {
		this.id = id;
		this.data = data;
		this.done = false;
		this.lang = lang;
		this.labels = labels.get(lang) || labels.get("en-US") || {};
		this.prepared = {};
		this.output = "";
		this.ready = true;
		this.title = title;
		this.type = type;

		return this;
	}

	process () {
		let result;

		try {
			this.prepared = transforms.get(this.type)(this.title, Array.isArray(this.data) ? this.data : [this.data]);
			result = true;
		} catch (err) {
			result = false;
		}

		this.data = null;

		return result;
	}

	render () {
		if (this.done === false && this.ready) {
			this.output = JSON.stringify(this.prepared, null, 2);
			this.prepared = {};
			this.done = true;
			this.ready = false;
		}

		return this.output;
	}
}

function kg ({data = [], id = `kg${increment()}`, lang = "en-US", title = "", type = ""} = {}) {
	return new KidGolden(id, data, lang, title, type);
}

exports.kg = kg;
