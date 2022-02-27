"use strict";

import {increment} from "./increment";
import {labels} from "./labels";
import {transforms} from "./transforms";

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

export {kg};
