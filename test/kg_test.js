"use strict";

const path = require("path"),
	assert = require("assert"),
	{kg} = require(path.join(__dirname, "..", "dist", "kg.cjs.js")),
	data = require(path.join(__dirname, "kg_test.json"));

describe("Kid Golden instance - kg()", function () {
	const lkg = kg({data}),
		lkg2 = kg({data});

	it("should have a unique id", function () {
		assert.strictEqual(lkg.id, "kg1");
		assert.strictEqual(lkg.id !== lkg2.id, true);
	});

	it("should have data", function () {
		assert.strictEqual(lkg.data !== null, true);
	});

	it("should have a lang", function () {
		assert.strictEqual(lkg.lang, "en-US");
	});

	it("should be ready", function () {
		assert.strictEqual(lkg.ready === true, true);
	});

	it("should not be done", function () {
		assert.strictEqual(lkg.done === false, true);
	});

	it("should have process() method", function () {
		assert.strictEqual(typeof lkg.process, "function");
	});

	it("should have results in prepared[] from process()", function () {
		assert.strictEqual(lkg.process(), true);
		assert.strictEqual(lkg.prepared.length > 0, true);
		assert.strictEqual(lkg.data, null);
	});

	it("should have render() method", function () {
		assert.strictEqual(typeof lkg.render, "function");
	});

	it("should get a string from render()", function () {
		assert.strictEqual(typeof lkg.render(), "string");
	});

	it("should not be ready", function () {
		assert.strictEqual(lkg.ready === false, true);
	});

	it("should be done", function () {
		assert.strictEqual(lkg.done === true, true);
	});

	it("should not have prepared strings", function () {
		assert.strictEqual(lkg.prepared.length, 0);
	});

	it("should not have data", function () {
		assert.strictEqual(lkg.data, null);
	});

	it("should have output", function () {
		assert.strictEqual(typeof lkg.output, "string");
	});
});
