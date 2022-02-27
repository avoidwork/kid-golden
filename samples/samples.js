"use strict";

(async function (render, console, kg) {
	function log (arg = "", type = "log") {
		console[type](typeof arg !== "object" ? `${new Date().getTime()}: ${arg.toString()}` : arg);
	}

	function display (type = "", el = {}, {title = "", description = "", data = []}) {
		const tpl = templates.get("diagram").cloneNode(true);

		tpl.querySelector("h2").innerText = title;
		tpl.querySelector("p").innerText = description;
		kg(type, data, tpl.querySelector("div[data-id='render']"));

		render(() => {
			el.appendChild(tpl);
			log(`Rendered ${type} diagram`);
		});
	}

	log("Hello! Lets render some diagrams!");

	const templates = new Map(Array.from(document.querySelectorAll("template")).map(i => [i.dataset.id, i.content.cloneNode(true)])),
		res = await fetch("samples.json"),
		data = await res.json(),
		ctx = document.querySelector("section");

	log("Templates & data loaded");
	log(templates);
	log(data);
	log("Rendering types of diagrams");

	for (const key of Object.keys(data)) {
		for (const val of data[key].values()) {
			display(key, ctx, val);
		}
	}
}(window.requestAnimationFrame, console, kg.kg));
