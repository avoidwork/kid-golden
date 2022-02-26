"use strict";

const path = require("path"),
	assert = require("assert"),
	{kg} = require(path.join(__dirname, "..", "dist", "kg.cjs.js")),
	data = require(path.join(__dirname, "kg_test.json"));

describe("Kid Golden - kg()", function () {
	const lkg = kg({data}),
		result = lkg.render();

	it("should return a string", function () {
		assert.strictEqual(typeof result, "string");
	});
});
