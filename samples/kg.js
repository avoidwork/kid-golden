!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self).kg={})}(this,(function(t){"use strict";const n=new Map([["sunburst",function(t="",n={},e=500,r=500){return`<script>\n// JSON data\nvar nodeData = ${JSON.stringify(n).replace(/^"|"$/g,"")};\n\n// Variables\nvar width = ${e};\nvar height = ${r};\nvar radius = Math.min(width, height) / 2;\nvar color = d3.scaleOrdinal(d3.schemeCategory20b);\n\n// Create primary <g> element\nvar g = d3.select('svg[data-id="${t}"]')\n    .attr('width', width)\n    .attr('height', height)\n    .append('g')\n    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');\n\n// Data strucure\nvar partition = d3.partition()\n    .size([2 * Math.PI, radius]);\n\n// Find data root\nvar root = d3.hierarchy(nodeData)\n    .sum(function (d) { return d.size});\n\n// Size arcs\npartition(root);\nvar arc = d3.arc()\n    .startAngle(function (d) { return d.x0 })\n    .endAngle(function (d) { return d.x1 })\n    .innerRadius(function (d) { return d.y0 })\n    .outerRadius(function (d) { return d.y1 });\n\n// Put it all together\ng.selectAll('path')\n    .data(root.descendants())\n    .enter().append('path')\n    .attr("display", function (d) { return d.depth ? null : "none"; })\n    .attr("d", arc)\n    .style('stroke', '#fff')\n    .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });\n<\/script>\n`}]]),e=new Map;function r(t="kg"){const n=(e.get(t)||0)+1;return e.set(t,n),n}function i(t){return JSON.parse(JSON.stringify(t))}const a={name:"",children:[]};function d(t={},n=[]){const e=i(a);return e.name=`${t.id}: ${t.label}`,e.children=t.children.map((t=>d(n.filter((n=>n.id===t))[0],n))),e}const s=new Map([["sunburst",function(t="",n=[]){const e=n.filter((t=>0===t.parent.length)),r=Array.from(new Set(e.reduce(((t,n)=>[...t,...n.layer]),[]))),s=i(a);return s.name=t,s.children=r.map((t=>{const r=i(a);return r.name=t,r.children=e.filter((n=>n.layer.includes(t))).map((t=>d(t,n))),r})),s}]]);class o{constructor(t="",n=[{}],e=null,r="",i=""){return this.id=t,this.data=n,this.done=!1,this.prepared={},this.output="",this.ready=!0,this.target=e,this.title=r,this.type=i,this}process(){let t;try{this.prepared=s.get(this.type)(this.title,Array.isArray(this.data)?this.data:[this.data]),t=!0}catch(n){t=!1}return this.data=null,t}render(){if(!1===this.done&&this.ready&&(this.output=n.get(this.type)(this.id,this.prepared),this.prepared={},this.done=!0,this.ready=!1,null!==this.target)){const t=document.createDocumentFragment();t.innerHTML=`<svg data-id="${this.id}"></svg>\n${this.output}`,this.target.appendChild(t)}return this.output}}t.kg=function({data:t=[],id:n=`kg${r()}`,target:e=null,title:i="",type:a=""}={}){return new o(n,t,e,i,a)},Object.defineProperty(t,"__esModule",{value:!0})}));