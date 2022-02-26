"use strict";

const path = require("path"),
	assert = require("assert"),
	{kg} = require(path.join(__dirname, "..", "dist", "kg.cjs.js")),
	data = require(path.join(__dirname, "kg_test.json"));

describe("Kid Golden - kg()", function () {
	const lkg = kg({data});

	it("should have an id", function () {
		assert.strictEqual(lkg.id, "kg1");
	});

	it("should have a lang", function () {
		assert.strictEqual(lkg.lang, "en-US");
	});

	it("should be ready", function () {
		assert.strictEqual(lkg.ready, true);
	});

	it("should not be done", function () {
		assert.strictEqual(lkg.done, false);
	});

	it("should have render() method", function () {
		assert.strictEqual(typeof lkg.render, "function");
	});

	lkg.render();

	it("should not be ready", function () {
		assert.strictEqual(lkg.ready, false);
	});

	it("should be done", function () {
		assert.strictEqual(lkg.done, true);
	});

	it("should have output", function () {
		assert.strictEqual(typeof lkg.output, "string");
	});

	it("should have prepared strings", function () {
		assert.strictEqual(lkg.prepared.length, 0);
	});
});
