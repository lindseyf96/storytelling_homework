// Cut and paste from 03-radial-area.js

import * as d3 from 'd3'

const margin = { top: 0, left: 0, right: 0, bottom: 0 }

const height = 400 - margin.top - margin.bottom

const width = 400 - margin.left - margin.right

const svg = d3
  .select('#chart-4')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr('transform', `translate(${width / 2},${height / 2})`)

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]

// I give you a month
// you give me back a number of radians

const angleScale = d3
  // .scalePoint()
  // .padding(0.5)
  .scaleBand()
  .domain(months)
  .range([0, Math.PI * 2])

const radius = 150

// If I sell 0 houses, I have a radius of 0
// If I sell 70 houses, I have a radius of... radius? 150

const radiusScale = d3
  .scaleLinear()
  .domain([0, 90])
  .range([0, radius])

const line = d3
  .radialArea()
  .angle(d => angleScale(d.month_name))
  .innerRadius(d => radiusScale(d.low_temp))
  .outerRadius(d => radiusScale(d.high_temp))

// I've been told to draw a line that's
// the average

d3.csv(require('/data/ny-temps.csv'))
  .then(ready)
  .catch(err => console.log('Failed with', err))
function ready(datapoints) {
  // Throw January onto the end so it connects
  datapoints.push(datapoints[0])

  svg
    .append('g')
    .append('path')
    .datum(datapoints)
    .attr('d', line)
    .attr('fill', '#ADD8E6')

  // No matter what, this is at 70 houses sold
  // svg
  //   .append('circle')
  //   .attr('cx', 0)
  //   .attr('cy', 0)
  //   // .attr('r', 150)
  //   // .attr('r', radius)
  //   .attr('r', radiusScale(70))
  //   .attr('stroke', 'black')
  //   .attr('fill', 'none')
  const bands = [20, 30, 40, 50, 60, 70, 80, 90]
  const label = [30, 50, 70, 90]

  // Draw a circle for each item in bands

  svg
    .selectAll('.band')
    .data(bands)
    .enter()
    .append('circle')
    .attr('fill', 'none')
    .attr('stroke', 'lightgrey')
    .attr('r', function(d) {
      console.log(d)
      return radiusScale(d)
    })
    .lower()

  svg
    .selectAll('.label')
    .data(label)
    .enter()
    .append('text')
    .text(d => d)
    .attr('y', d => -radiusScale(d))
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')

  svg
    .append('text')
    .text('NYC')
    .attr('text-anchor', 'middle')
    .attr('x', 0)
    .attr('y', 0)
    .attr('font-weight', 'bold')
    .attr('font-size', 23)
}
