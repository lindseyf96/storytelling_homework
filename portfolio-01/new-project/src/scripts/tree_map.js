import * as d3 from 'd3'
import d3Tip from "d3-tip"
d3.tip = d3Tip

var margin = {top: 50, right: 70, bottom: 50, left: 50},
  width = 700 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

var svg = d3.select("#tree_map")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
  
import * as d3Hierarchy from 'd3-hierarchy'


// import d3Hierarchy from 'd3-hierarchy';
// d3.hierarchy = d3Hierarchy 

// import * as d3Stratify from 'd3-hierarchy'
// d3.stratify = d3Stratify

// import * as d3treeMap from 'd3-hierarchy'
// d3.treemap = d3treeMap

var tip = d3.tip()
.attr('class', 'd3-tip')
.offset([-10, 0])
.html(function(d) {
  return ` <span style='color:navy'>${d.value}</span>`;
})

svg.call(tip);


// Read data
d3.csv(require('../data/lost_items_agg.csv'))
  .then(ready)
  .catch(function(err) {
    console.log('Failed with', err)
  })

function ready(data) {
  // stratify the data: reformatting for d3.js
  var root = d3Hierarchy.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
  root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity

  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3Hierarchy.treemap()
    .size([width, height])
    .padding(4)
    (root)

console.log(root.leaves())
  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "#4cc1fc")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name})
      .attr("font-size", "12px")
      .attr("fill", "black")
}



