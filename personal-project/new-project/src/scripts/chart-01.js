import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = { top: 50, left: 150, right: 50, bottom: 50 }
const height = 600 - margin.top - margin.bottom
const width = 500 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Build your scales here

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 6])
  .range([0, width])

const yPositionScale = d3
  .scaleBand()
  .domain([
    'Lawful Evil',
    'Neutral Evil',
    'Chaotic Neutral',
    'Chaotic Good',
    'Chaotic Evil',
    'Lawful Good',
    'Lawful Neutral',
    'True Neutral',
    'Neutral Good'
  ])
  .range([height, 0])
  .padding(0.25)

const y_axis = d3.axisLeft(yPositionScale)
svg
  .append('g')
  .attr('class', 'axis y-axis')
  .call(y_axis)
  .attr('font-size', 18)

d3.csv(require('../data/alignments.csv'))
  .then(ready)
  .catch(function(err) {
    console.log('Failed with', err)
  })

const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  // .x(d.Number)
  .offset([0, 10])
  .html(function(d) {
    return ` <span style='color:red'>${d.Percentage}</span>`
  })
  .direction('e')

svg.call(tip)

// const x_axis = d3.axisBottom(xPositionScale)
// svg
//   .append('g')
//   .attr('class', 'axis x-axis')
//   .attr('transform', 'translate(0,' + height + ')')
//   .call(x_axis)

function ready(datapoints) {
  // Add and style your marks here
  const x_axis = d3
    .axisTop(xPositionScale)
    .ticks(3)
    // .tickFormat(d => d + '%')
    .tickSize(-height)

  svg
    .append('g')
    .attr('class', 'axis x-axis')
    // .attr('transform', 'translate(0,' + height + ')')
    .call(x_axis)
    .lower()
  svg.selectAll('.axis line').attr('stroke', '#ccc')
  svg.selectAll('.axis path').attr('stroke', 'none')
  svg.selectAll('.axis text').attr('font-size', 18)
  svg.selectAll('.x-axis text').attr('fill', '#999999')

  svg
    .selectAll('rect')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('width', function(d) {
      return xPositionScale(d.Number)
    })
    .attr('height', yPositionScale.bandwidth())
    .attr('y', function(d) {
      return yPositionScale(d.Category)
    })
    .attr('x', 0)
    .attr('fill', '#67bea2')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

  svg.selectAll('rect').each(function() {
    this.addEventListener('mouseover', function() {
      d3.select(this).attr('fill', '#b2d8d8')
    })
    this.addEventListener('mouseout', function() {
      d3.select(this).attr('fill', '#67bea2')
    })
  })
}
