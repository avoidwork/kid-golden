"use strict";

import {increment} from "./increment.js";
import {labels} from "./labels.js";

class KidGolden {
	constructor (data, id, lang) {
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
	return new KidGolden(data, id, lang);
}

export {kg};
