'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function sunburst$1 (id = "", arg = {}, width = 500, height = 500) {
	return `<script>
// JSON data
var nodeData = ${JSON.stringify(arg).replace(/^"|"$/g, "")};

// Variables
var width = ${width};
var height = ${height};
var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory20b);

// Create primary <g> element
var g = d3.select('svg[data-id="${id}"]')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

// Data strucure
var partition = d3.partition()
    .size([2 * Math.PI, radius]);

// Find data root
var root = d3.hierarchy(nodeData)
    .sum(function (d) { return d.size});

// Size arcs
partition(root);
var arc = d3.arc()
    .startAngle(function (d) { return d.x0 })
    .endAngle(function (d) { return d.x1 })
    .innerRadius(function (d) { return d.y0 })
    .outerRadius(function (d) { return d.y1 });

// Put it all together
g.selectAll('path')
    .data(root.descendants())
    .enter().append('path')
    .attr("display", function (d) { return d.depth ? null : "none"; })
    .attr("d", arc)
    .style('stroke', '#fff')
    .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });
</script>
`;
}

const diagrams = new Map([
	["sunburst", sunburst$1]
]);

const counters = new Map();

function increment (key = "kg") {
	const n = counters.get(key) || 0,
		result = n + 1;

	counters.set(key, result);

	return result;
}

function clone (arg) {
	return JSON.parse(JSON.stringify(arg));
}

const tpl = {name: "", children: []};

function crawl (arg = {}, data = []) {
	const result = clone(tpl);

	result.name = `${arg.id}: ${arg.label}`;
	result.children = arg.children.map(i => crawl(data.filter(di => di.id === i)[0], data));

	return result;
}

function sunburst (name = "", data = []) {
	const top = data.filter(i => i.parent.length === 0),
		layers = Array.from(new Set(top.reduce((a, v) => [...a, ...v.layer], []))),
		result = clone(tpl);

	result.name = name;
	result.children = layers.map(li => {
		const rli = clone(tpl);

		rli.name = li;
		rli.children = top.filter(ti => ti.layer.includes(li)).map(ti => crawl(ti, data));

		return rli;
	});

	return result;
}

const transforms = new Map([
	["sunburst", sunburst]
]);

class KidGolden {
	constructor (id = "", data = [{}], target = null, title = "", type = "") {
		this.id = id;
		this.data = data;
		this.done = false;
		this.prepared = {};
		this.output = "";
		this.ready = true;
		this.target = target;
		this.title = title;
		this.type = type;

		return this;
	}

	process () {
		let result;

		try {
			this.prepared = transforms.get(this.type)(this.title, Array.isArray(this.data) ? this.data : [this.data]);
			result = true;
		} catch (err) {
			result = false;
		}

		this.data = null;

		return result;
	}

	render () {
		if (this.done === false && this.ready) {
			this.output = diagrams.get(this.type)(this.id, this.prepared);
			this.prepared = {};
			this.done = true;
			this.ready = false;

			if (this.target !== null) {
				this.target.innerHTML = `<svg data-id="${this.id}"></svg>
${this.output}`;
			}
		}

		return this.output;
	}
}

function kg ({data = [], id = `kg${increment()}`, target = null, title = "", type = ""} = {}) {
	return new KidGolden(id, data, target, title, type);
}

exports.kg = kg;
