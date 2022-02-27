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

class KidGolden {
	constructor (id = "", data = [{}], lang = "en-US") {
		this.id = id;
		this.data = data;
		this.done = false;
		this.lang = lang;
		this.labels = labels.get(lang) || labels.get("en-US") || {};
		this.prepared = [];
		this.output = "";
		this.ready = true;

		return this;
	}

	process () {
		let result;

		try {
			this.prepared = (Array.isArray(this.data) ? this.data : [this.data]).map(i => {
				return JSON.stringify(i);
			});
			this.data = null;
			result = true;
		} catch (err) {
			result = false;
		}

		return result;
	}

	render () {
		if (this.done === false && this.ready) {
			this.output = JSON.stringify(this.prepared);
			this.prepared.length = 0;
			this.done = true;
			this.ready = false;
		}

		return this.output;
	}
}

function kg ({data = [], id = `kg${increment()}`, lang = "en-US"} = {}) {
	return new KidGolden(id, data, lang);
}

exports.kg = kg;
