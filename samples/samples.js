"use strict";

(async function () {
	function log (arg = "", type = "log") {
		console[type](typeof arg !== "object" ? `${new Date().getTime()}: ${arg.toString()}` : arg);
	}

	log("Hello! Lets render some diagrams!");

	const templates = new Map(Array.from(document.querySelectorAll("template")).map(i => [i.dataset.id, i.content.cloneNode(true)])),
		res = await fetch("samples.json"),
		data = await res.json();

	log("Templates & data loaded");
	log(templates);
	log(data);
}());
