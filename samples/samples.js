"use strict";

(async function (render, console, kg) {
	const templates = new Map(Array.from(document.querySelectorAll("template")).map(i => [i.dataset.id, i.content.cloneNode(true)])),
		res = await fetch("samples.json"),
		rdata = await res.json(),
		ctx = document.querySelector("section");

	function clone (arg = null) {
		return JSON.parse(JSON.stringify(arg));
	}

	function log (arg = "", type = "log") {
		console[type](typeof arg !== "object" ? `${new Date().getTime()}: ${arg.toString()}` : arg);
	}

	async function display (type = "", el = {}, {title = "", description = "", data = []}) {
		const tpl = templates.get("diagram").cloneNode(true),
			lkg = kg({data, title, type});

		if (lkg.process()) {
			const html = lkg.render();

			tpl.querySelector("h2").innerText = `${title} (${type})`;
			tpl.querySelector("p").innerText = description;
			tpl.querySelector("div[data-id='preview']").innerHTML = `<pre>
${lkg.render().replace(/script/g, "code")}
</pre>`;
			tpl.querySelector("div[data-id='sample']").innerHTML = html;

			render(() => {
				el.appendChild(tpl);
				log(`Rendered ${type} diagram`);
			});
		}
	}

	log("Hello! Lets render some diagrams!");
	log(templates);
	log(rdata);
	log("Rendering types of diagrams");

	for (const key of Object.keys(rdata)) {
		for (const val of rdata[key].values()) {
			display(key, ctx, clone(val));
		}
	}
}(window.requestAnimationFrame, console, window.kg.kg));
