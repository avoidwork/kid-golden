"use strict";

function clone (arg) {
	return JSON.parse(JSON.stringify(arg));
}

export {clone};
