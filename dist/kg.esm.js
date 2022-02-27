const t=new Map([["sunburst",function(t="",n={},r=500,e=500){return`<script type="application/javascript">\n// JSON data\nvar nodeData = ${JSON.stringify(n).replace(/^"|"$/g,"")};\n\n// Variables\nvar width = ${r};\nvar height = ${e};\nvar radius = Math.min(width, height) / 2;\nvar color = d3.scaleOrdinal(d3.schemeCategory20b);\n\n// Create primary <g> element\nvar g = d3.select('svg[data-id="${t}"]')\n    .attr('width', width)\n    .attr('height', height)\n    .append('g')\n    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');\n\n// Data strucure\nvar partition = d3.partition()\n    .size([2 * Math.PI, radius]);\n\n// Find data root\nvar root = d3.hierarchy(nodeData)\n    .sum(function (d) { return d.size});\n\n// Size arcs\npartition(root);\nvar arc = d3.arc()\n    .startAngle(function (d) { return d.x0 })\n    .endAngle(function (d) { return d.x1 })\n    .innerRadius(function (d) { return d.y0 })\n    .outerRadius(function (d) { return d.y1 });\n\n// Put it all together\ng.selectAll('path')\n    .data(root.descendants())\n    .enter().append('path')\n    .attr("display", function (d) { return d.depth ? null : "none"; })\n    .attr("d", arc)\n    .style('stroke', '#fff')\n    .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });\n<\/script>\n`}]]),n=new Map;function r(t="kg"){const r=(n.get(t)||0)+1;return n.set(t,r),r}function e(t){return JSON.parse(JSON.stringify(t))}const a={name:"",children:[]};function i(t={},n=[]){const r=e(a);return r.name=`${t.id}: ${t.label}`,r.children=t.children.map((t=>i(n.filter((n=>n.id===t))[0],n))),r}const d=new Map([["sunburst",function(t="",n=[]){const r=n.filter((t=>0===t.parent.length)),d=Array.from(new Set(r.reduce(((t,n)=>[...t,...n.layer]),[]))),s=e(a);return s.name=t,s.children=d.map((t=>{const d=e(a);return d.name=t,d.children=r.filter((n=>n.layer.includes(t))).map((t=>i(t,n))),d})),s}]]);class s{constructor(t="",n=[{}],r=null,e="",a=""){return this.id=t,this.data=n,this.done=!1,this.prepared={},this.output="",this.ready=!0,this.target=r,this.title=e,this.type=a,this}process(){let t;try{this.prepared=d.get(this.type)(this.title,Array.isArray(this.data)?this.data:[this.data]),t=!0}catch(n){t=!1}return this.data=null,t}render(){return!1===this.done&&this.ready&&(this.output=t.get(this.type)(this.id,this.prepared),this.prepared={},this.done=!0,this.ready=!1,null!==this.target&&(this.target.innerHTML=`<svg data-id="${this.id}"></svg>\n${this.output}`)),this.output}}function h({data:t=[],id:n=`kg${r()}`,target:e=null,title:a="",type:i=""}={}){return new s(n,t,e,a,i)}export{h as kg};