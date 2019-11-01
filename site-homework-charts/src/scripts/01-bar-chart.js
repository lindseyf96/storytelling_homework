import * as d3 from 'd3'

const margin = {
  top: 30,
  right: 20,
  bottom: 30,
  left: 20
}

const width = 700 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const svg = d3
  .select('#bar-chart')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3.scaleBand().range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 85])
  .range([height, 0])

d3.csv(require('../data/countries.csv')).then(ready)

function ready(datapoints) {
  console.log('Data read in:', datapoints)

  // Sort the countries from low to high
  datapoints = datapoints.sort((a, b) => {
    return a.life_expectancy - b.life_expectancy
  })

  // And set up the domain of the xPositionScale
  // using the read-in data
  const countries = datapoints.map(d => d.country)
  xPositionScale.domain(countries)

  /* Add your rectangles here */

  svg
    .selectAll('rect')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('width', xPositionScale.bandwidth())
    .attr('height', d => height - yPositionScale(d.life_expectancy))
    .attr('fill', 'lightgrey')
    .attr('x', d => xPositionScale(d.country))
    .attr('y', d => yPositionScale(d.life_expectancy))

  d3.select('#asia').on('click', function() {
    console.log('clicked')
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.continent == 'Asia') {
        return '#ccebc5'
      } else {
        return 'lightgrey'
      }
    })
  })

  d3.select('#africa').on('click', function() {
    console.log('clicked')
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.continent == 'Africa') {
        return '#b3cde3'
      } else {
        return 'lightgrey'
      }
    })
  })

  d3.select('#northAmerica').on('click', function() {
    console.log('clicked')
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.continent == 'N. America') {
        return '#fbb4ae'
      } else {
        return 'lightgrey'
      }
    })
  })

  d3.select('#color').on('click', function() {
    console.log('clicked')
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.continent == 'Africa') {
        return '#b3cde3'
      }
      if (d.continent == 'Asia') {
        return '#ccebc5'
      }
      if (d.continent == 'N. America') {
        return '#fbb4ae'
      }
      if (d.continent == 'S. America') {
        return '#aaddcf'
      }
      if (d.continent == 'Oceana') {
        return 'yellow'
      }
      if (d.continent == 'Europe') {
        return '#e4908a'
      } else {
        return 'lightgrey'
      }
    })
  })

  d3.select('#lowGDP').on('click', function() {
    console.log('clicked')
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.gdp_per_capita < 3000) {
        return 'pink'
      } else {
        return 'lightgrey'
      }
    })
  })

  d3.select('#reset').on('click', function() {
    console.log('clicked')
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.continent == 'Africa') {
        return 'lightgrey'
      }
      if (d.continent == 'Asia') {
        return 'lightgrey'
      }
      if (d.continent == 'N. America') {
        return 'lightgrey'
      }
      if (d.continent == 'S. America') {
        return 'lightgrey'
      }
      if (d.continent == 'Oceana') {
        return 'lightgrey'
      }
      if (d.continent == 'Europe') {
        return 'lightgrey'
      } else {
        return 'lightgrey'
      }
    })
  })

  const yAxis = d3
    .axisLeft(yPositionScale)
    .tickSize(-width)
    .ticks(5)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
    .lower()

  d3.select('.y-axis .domain').remove()
}
