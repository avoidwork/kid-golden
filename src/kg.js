"use strict";

import {increment} from "./increment";
import {transforms} from "./transforms";

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

export {kg};
