import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = { top: 50, left: 150, right: 50, bottom: 50 }
const height = 600 - margin.top - margin.bottom
const width = 500 - margin.left - margin.right
const svg = d3
  .select('#chart-3')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
const xPositionScale = d3
  .scaleLinear()
  .domain([0, 6])
  .range([0, width])
const yPositionScale = d3
  .scaleBand()
  .range([height, 0])
  .padding(0.25)

d3.csv(require('../data/alignments_stacked2.csv'))
  .then(ready)
  .catch(err => console.log('Failed on', err))
function ready(datapoints) {
  // Extract the year from the date column
  // Make sure points is a number
  const tip = d3
    .tip()
    .attr('class', 'd3-tip')
    .offset([0, 10])
    .html(function(d) {
      return ` <span style='color:red'>${d.Per_MS}</span>`
    })
    .direction('e')

  const tip1 = d3
    .tip()
    .attr('class', 'd3-tip')
    .offset([0, 105])
    .html(function(d) {
      return ` <span style='color:red'>${d.Per_Lede}</span>`
    })
    .direction('e')

  svg.call(tip)

  svg.call(tip1)

  datapoints.sort((a, b) => a.Lede - b.Lede)
  const categories = datapoints.map(d => d.Category)
  yPositionScale.domain(categories)
  svg
    .selectAll('.non_students')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('class', 'non_students')
    .attr('y', d => yPositionScale(d.Category))
    .attr('x', d => xPositionScale(d.Lede))
    .attr('height', yPositionScale.bandwidth())
    .attr('width', d => xPositionScale(d.MS))
    .attr('fill', '#999999')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
  svg
    .selectAll('.students')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('class', 'students')
    .attr('y', d => yPositionScale(d.Category))
    .attr('x', 0)
    .attr('height', yPositionScale.bandwidth())
    .attr('width', d => xPositionScale(d.Lede))
    .attr('fill', '#67bea2')
    .on('mouseover', tip1.show)
    .on('mouseout', tip1.hide)
  const labels = ['Students', "Professors/TA's"]
  svg
    .selectAll('.label')
    .data(labels)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('y', yPositionScale('Lawful Good'))
    .attr('x', function(d) {
      if (d === 'Lede') {
        return xPositionScale(80)
      } else {
        return xPositionScale(20)
      }
    })
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('alignment-baseline', 'middle')
    .attr('font-size', 18)
    .attr('dy', yPositionScale.bandwidth() / 2 + 2)
    .text(d => d)

  const yAxis = d3
    .axisLeft(yPositionScale)
    .tickSize(0)
    .tickFormat(d => d)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
  svg
    .selectAll('.y-axis text')
    // .attr('fill', d => {
    //   if (d === 'Harp' || d == 'Flute' || d == 'Violin') {
    //     return '#67bea2'
    //   } else {
    //     return '#999999'
    //   }
    // })
    .attr('dx', -10)
  const xAxis = d3
    .axisTop(xPositionScale)
    .ticks(3)
    // .tickFormat(d => d + '%')
    .tickSize(-height)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .call(xAxis)
    .lower()
  svg.selectAll('.axis line').attr('stroke', '#ccc')
  svg.selectAll('.axis path').attr('stroke', 'none')
  svg.selectAll('.axis text').attr('font-size', 18)
  svg.selectAll('.x-axis text').attr('fill', '#999999')

  svg.selectAll('.students').each(function() {
    this.addEventListener('mouseover', function() {
      d3.select(this).attr('fill', '#b2d8d8')
    })
    this.addEventListener('mouseout', function() {
      d3.select(this).attr('fill', '#67bea2')
    })
  })

  svg.selectAll('.non_students').each(function() {
    this.addEventListener('mouseover', function() {
      d3.select(this).attr('fill', '#d3d3d3')
    })
    this.addEventListener('mouseout', function() {
      d3.select(this).attr('fill', '#999999')
    })
  })

  // Handmade legend
  svg
    .append('circle')
    .attr('cx', 200)
    .attr('cy', 400)
    .attr('r', 6)
    .style('fill', '#67bea2')
  svg
    .append('circle')
    .attr('cx', 200)
    .attr('cy', 430)
    .attr('r', 6)
    .style('fill', '#999999')
  svg
    .append('text')
    .attr('x', 220)
    .attr('y', 400)
    .text('Lede students')
    .style('font-size', '15px')
    .attr('alignment-baseline', 'middle')
    .attr('fill', 'white')
  svg
    .append('text')
    .attr('x', 220)
    .attr('y', 430)
    .text('MS Data students')
    .style('font-size', '15px')
    .attr('alignment-baseline', 'middle')
    .attr('fill', 'white')

}
