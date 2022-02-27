"use strict";

const path = require("path"),
	assert = require("assert"),
	{kg} = require(path.join(__dirname, "..", "dist", "kg.cjs.js")),
	data = require(path.join(__dirname, "kg_test.json")),
	type = "sunburst";

describe("Kid Golden instance - kg()", function () {
	const lkg = kg({data, type}),
		lkg2 = kg({data, type});

	it("should have a unique id", function () {
		assert.strictEqual(lkg.id, "kg1");
		assert.strictEqual(lkg.id !== lkg2.id, true);
	});

	it("should have data", function () {
		assert.strictEqual(lkg.data !== null, true);
	});

	it("should not be done", function () {
		assert.strictEqual(lkg.done === false, true);
	});

	it("should have process() method", function () {
		assert.strictEqual(typeof lkg.process, "function");
		assert.strictEqual(lkg.process(), true);
	});

	it("should be done", function () {
		assert.strictEqual(lkg.done === true, true);
	});

	it("should not have data", function () {
		assert.strictEqual(lkg.data, null);
	});

	it("should have output", function () {
		assert.strictEqual(lkg.output !== null, true);
	});
});
