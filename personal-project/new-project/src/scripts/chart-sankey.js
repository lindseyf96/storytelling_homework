// // import * as d3 from 'd3'
// // import d3Tip from 'd3-tip'
// // d3.tip = d3Tip

// const margin = { top: 10, right: 10, bottom: 10, left: 10 }
// const width = 450 - margin.left - margin.right
// const height = 480 - margin.top - margin.bottom

// // append the svg object to the body of the page
// const svg = d3
//   .select('#chart-3')
//   .append('svg')
//   .attr('width', width + margin.left + margin.right)
//   .attr('height', height + margin.top + margin.bottom)
//   .append('g')
//   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// // Color scale used
// const color = d3.scaleOrdinal(d3.schemeCategory20)

// // Set the sankey diagram properties
// const sankey = d3
//   .sankey()
//   .nodeWidth(36)
//   .nodePadding(290)
//   .size([width, height])

// // load the data
// d3.json(
//   'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_sankey.json',
//   function(error, graph) {
//     // Constructs a new Sankey generator with the default settings.
//     sankey
//       .nodes(graph.nodes)
//       .links(graph.links)
//       .layout(1)

//     // add in the links
//     const link = svg
//       .append('g')
//       .selectAll('.link')
//       .data(graph.links)
//       .enter()
//       .append('path')
//       .attr('class', 'link')
//       .attr('d', sankey.link())
//       .style('stroke-width', function(d) {
//         return Math.max(1, d.dy)
//       })
//       .sort(function(a, b) {
//         return b.dy - a.dy
//       })

//     // add in the nodes
//     const node = svg
//       .append('g')
//       .selectAll('.node')
//       .data(graph.nodes)
//       .enter()
//       .append('g')
//       .attr('class', 'node')
//       .attr('transform', function(d) {
//         return 'translate(' + d.x + ',' + d.y + ')'
//       })
//       .call(
//         d3
//           .drag()
//           .subject(function(d) {
//             return d
//           })
//           .on('start', function() {
//             this.parentNode.appendChild(this)
//           })
//           .on('drag', dragmove)
//       )

//     // add the rectangles for the nodes
//     node
//       .append('rect')
//       .attr('height', function(d) {
//         return d.dy
//       })
//       .attr('width', sankey.nodeWidth())
//       .style('fill', function(d) {
//         return (d.color = color(d.name.replace(/ .*/, '')))
//       })
//       .style('stroke', function(d) {
//         return d3.rgb(d.color).darker(2)
//       })
//       // Add hover text
//       .append('title')
//       .text(function(d) {
//         return d.name + '\n' + 'There is ' + d.value + ' stuff in this node'
//       })

//     // add in the title for the nodes
//     node
//       .append('text')
//       .attr('x', -6)
//       .attr('y', function(d) {
//         return d.dy / 2
//       })
//       .attr('dy', '.35em')
//       .attr('text-anchor', 'end')
//       .attr('transform', null)
//       .text(function(d) {
//         return d.name
//       })
//       .filter(function(d) {
//         return d.x < width / 2
//       })
//       .attr('x', 6 + sankey.nodeWidth())
//       .attr('text-anchor', 'start')

//     // the function for moving the nodes
//     function dragmove(d) {
//       d3.select(this).attr(
//         'transform',
//         'translate(' +
//           d.x +
//           ',' +
//           (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) +
//           ')'
//       )
//       sankey.relayout()
//       link.attr('d', sankey.link())
//     }
//   }
// )
