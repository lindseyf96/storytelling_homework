import * as d3 from 'd3'

const margin = { top: 60, left: 50, right: 150, bottom: 30 }

const height = 600 - margin.top - margin.bottom
const width = 450 - margin.left - margin.right

const svg = d3
  .select('#slope-graph')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create your scales
const xPositionScale = d3
  .scalePoint()
  .domain(['2015', '2016'])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 36])
  .range([height, 0])

const colorScale = d3
  .scaleOrdinal()
  .domain([
    'Maryland',
    'Delaware',
    'Maine',
    'Florida',
    'Illinois',
    'Alaska',
    'Arkansas',
    'Colorado',
    'Indiana',
    'Iowa',
    'Kentucky',
    'Louisiana',
    'Minnesota',
    'Missouri',
    'Nebraska',
    'North Dakota',
    'Texas',
    'Virginia',
    'Washington',
    'Wyoming'
  ])
  .range([
    '#4cc1fc',
    '#4cc1fc',
    '#4cc1fc',
    '#4cc1fc',
    '#4cc1fc',
    '#333333',
    '#333333',
    '#333333',
    '#333333',
    '#333333',
    '#333333',
    '#333333',
    '#333333',
    '#333333',
    '#333333',
    '#333333',
    '#333333',
    '#333333',
    '#333333',
    '#333333',
    '#333333'
  ])

const line = d3
  .line()
  .x(function(d) {
    return xPositionScale(d.year)
  })
  .y(function(d) {
    return yPositionScale(d.deaths_per_100k)
  })

d3.csv(require('../data/overdoses.csv'))
  .then(ready)
  .catch(err => {
    console.log('Failed with', err)
  })

// Import your data file using d3.queue()

function ready(datapoints) {
  datapoints.forEach(d => {
    d.deaths_per_100k = Math.round(d.deaths / d.population / 10)
  })

  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', function(d) {
      return xPositionScale(d.year)
    })
    .attr('cy', function(d) {
      return yPositionScale(d.deaths_per_100k)
    })
    .attr('fill', function(d) {
      return colorScale(d.state)
    })
    .attr('class', function(d) {
      return d.state
    })
    .on('mouseover', function(d, i) {
      console.log('mouseover on', this)
      d3.select(this)
        .transition()
        .duration(100)
        .attr('fill', 'yellow')
      d3.selectAll('.' + this.getAttribute('class')).attr('fill', 'yellow')
      d3.selectAll('.' + this.getAttribute('class')).attr('stroke', 'yellow')
    })
    .on('mouseout', function(d, i) {
      console.log('mouseout', this)
      d3.select(this)
        .transition()
        .duration(100)
      d3.selectAll('.' + this.getAttribute('class')).attr('fill', 'black')
      d3.selectAll('.' + this.getAttribute('class')).attr('stroke', 'black')
    })

  const nested = d3
    .nest()
    .key(function(d) {
      return d.state
    })
    .entries(datapoints)

  svg
    .selectAll('path')
    .data(nested)
    .enter()
    .append('path')
    .attr('stroke', function(d) {
      return colorScale(d.key)
    })
    .attr('stroke-width', 1.5)
    .attr('fill', 'none')
    .attr('d', function(d) {
      return line(d.values)
    })
    .attr('class', function(d) {
      return d.key
    })
    .on('mouseover', function(d, i) {
      console.log('mouseover on', this)
      d3.select(this)
        .transition()
        .duration(100)
        .attr('stroke', 'yellow')
      d3.selectAll('.' + this.getAttribute('class')).attr('stroke', 'yellow')
      d3.selectAll('.' + this.getAttribute('class')).attr('fill', 'yellow')
    })
    .on('mouseout', function(d, i) {
      console.log('mouseout', this)
      d3.select(this)
        .transition()
        .duration(100)
      d3.selectAll('.' + this.getAttribute('class')).attr('fill', 'black')
      d3.selectAll('.' + this.getAttribute('class')).attr('stroke', 'black')
    })

  svg
    .selectAll('text')
    .data(nested)
    .enter()
    .append('text')
    .attr('font-size', 12)
    .attr('fill', '#333333')
    .attr('x', xPositionScale('2016'))
    .attr('dx', 5)
    .attr('y', function(d) {
      return yPositionScale(d.values[1].deaths_per_100k)
    })
    .text(function(d) {
      return d.values[1].deaths_per_100k + ' ' + d.key
    })
    .attr('dy', function(d) {
      if (d.key === 'Texas') {
        return 18
      }
      if (d.key === 'Virginia') {
        return -12
      }
      return 3
    })
    .attr('class', function(d) {
      return d.key
    })
    .on('mouseover', function(d, i) {
      console.log('mouseover on', this)
      d3.select(this)
        .transition()
        .duration(100)
        .attr('fill', 'yellow')
      d3.selectAll('.' + this.getAttribute('class')).attr('fill', 'yellow')
      d3.selectAll('.' + this.getAttribute('class')).attr('stroke', 'yellow')
    })
    .on('mouseout', function(d, i) {
      console.log('mouseout', this)
      d3.select(this)
        .transition()
        .duration(100)
      d3.selectAll('.' + this.getAttribute('class')).attr('fill', 'black')
      d3.selectAll('.' + this.getAttribute('class')).attr('stroke', 'black')
      // d3.selectAll('text').attr('fill', function(d) {
      //   if (d.class == 'Maryland') {
      //     return 'blue'
      //   } else {
      //     return 'black'
      //   }
      // })
    })

  const xAxis = d3.axisBottom(xPositionScale)

  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
    .lower()

  const yAxis = d3
    .axisLeft(yPositionScale)
    .tickValues([5, 10, 15, 20, 25, 30, 35])
    .tickSize(-width)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
    .lower()

  svg.selectAll('.y-axis path').remove()
  svg.selectAll('.y-axis text').remove()
  svg
    .selectAll('.y-axis line')
    .attr('stroke-dasharray', 2)
    .attr('stroke', 'grey')
}
