import * as d3 from 'd3'

const margin = { top: 30, left: 30, right: 30, bottom: 30 }
const height = 400 - margin.top - margin.bottom
const width = 600 - margin.left - margin.right

console.log('Building chart 1')

const svg = d3
  .select('#chart-test')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create your scales
const xPositionScale = d3
  .scaleLinear()
  .domain([170, 230])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([60, 160])
  .range([height, 0])

const colorScale = d3
  .scaleOrdinal()
  .range(['orange', 'green', 'blue', 'purple', 'yellow'])

const radiusScale = d3
  .scaleSqrt()
  .domain([0, 700])
  .range([1, 8])

// Import your data file
d3.csv(require('../data/player_stats.csv'))
  .then(ready)
  .catch(err => {
    console.log(err)
  })

function ready(datapoints) {
  // Draw your dots

  const nested = d3
    .nest()
    .key(d => d.Pos)
    .entries(datapoints)

  console.log(nested)

  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', d => radiusScale(d.PTS))
    .attr('cx', function(d) {
      return xPositionScale(d.Height)
    })
    .attr('cy', function(d) {
      return yPositionScale(d.Weight)
    })
    .attr('fill', d => colorScale(d.Pos))
    .attr('opacity', 0.3)

  // Add your axes
  const xAxis = d3.axisBottom(xPositionScale)

  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  const yAxis = d3.axisLeft(yPositionScale)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
}
