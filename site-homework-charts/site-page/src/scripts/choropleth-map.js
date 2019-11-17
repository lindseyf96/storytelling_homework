import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 500 - margin.top - margin.bottom

let width = 900 - margin.left - margin.right

let svg = d3
  .select('#choropleth-map')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

let projection = d3.geoAlbers()
let colorScale = d3.scaleSequential(d3.interpolatePiYG).domain([0,1])
let opacityScale = d3.scaleLinear().domain([0, 50000]).range([0,1]).clamp(true)

// out geoPath needs a PROJECTION variable
let path = d3.geoPath().projection(projection)

d3.json(require('/data/counties.topojson'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(json) {
  console.log(json)
  let counties = topojson.feature(json, json.objects.elpo12p010g)

  svg
    .append('g')
    .selectAll('.country')
    .data(counties.features)
    .enter()
    .append('path')
    .attr('class', 'county')
    .attr('d', path)
    .attr('fill', d => {
      let total = d.properties.OBAMA + d.properties.ROMNEY
      return colorScale(d.properties.ROMNEY/total)
    })
    .attr('opacity', d => {
      let total = d.properties.OBAMA + d.properties.ROMNEY
      return opacityScale(total)
    })
}
