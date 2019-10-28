import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = { top: 50, left: 100, right: 50, bottom: 50 }
const height = 400 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

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
    'Lawful Good',
    'Lawful Neutral',
    'Lawful Evil',
    'Neutral Good',
    'True Neutral',
    'Neutral Evil',
    'Chaotic Good',
    'Chaotic Neutral',
    'Chaotic Evil'
  ])
  .range([height, 0])

const y_axis = d3.axisLeft(yPositionScale)
svg
  .append('g')
  .attr('class', 'axis y-axis')
  .call(y_axis)
const x_axis = d3.axisBottom(xPositionScale)
svg
  .append('g')
  .attr('class', 'axis x-axis')
  .attr('transform', 'translate(0,' + height + ')')
  .call(x_axis)

d3.csv(require('../data/alignments.csv'))
  .then(ready)
  .catch(function(err) {
    console.log('Failed with', err)
  })

const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([20, 150])
  .html(function(d) {
    return ` <span style='color:purple'>${d.Number}</span>`
  })

svg.call(tip)

function ready(datapoints) {
  // Add and style your marks here
  svg
    .selectAll('rect')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('width', function(d) {
      return xPositionScale(d.Number)
    })
    .attr('height', 20)
    .attr('y', function(d) {
      return yPositionScale(d.Category)
    })
    .attr('fill', '#90EE90')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
}
