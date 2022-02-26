"use strict";

const counters = new Map();

function increment (key = "kg") {
	const n = counters.get(key) || 0,
		result = n + 1;

	counters.set(key, result);

	return result;
}

export {increment};
