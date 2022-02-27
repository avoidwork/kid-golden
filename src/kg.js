"use strict";

import {diagrams} from "./diagrams";
import {increment} from "./increment";
import {transforms} from "./transforms";

class KidGolden {
	constructor (id = "", data = [{}], target = null, title = "", type = "") {
		this.id = id;
		this.data = data;
		this.done = false;
		this.prepared = {};
		this.output = "";
		this.ready = true;
		this.target = target;
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
			this.output = diagrams.get(this.type)(this.id, this.prepared);
			this.prepared = {};
			this.done = true;
			this.ready = false;

			if (this.target !== null) {
				this.target.innerHTML = `<svg data-id="${this.id}"></svg>
${this.output}`;
			}
		}

		return this.output;
	}
}

function kg ({data = [], id = `kg${increment()}`, target = null, title = "", type = ""} = {}) {
	return new KidGolden(id, data, target, title, type);
}

export {kg};
