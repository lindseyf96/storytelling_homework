import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 150, right: 0, bottom: 0 }

let height = 600 - margin.top - margin.bottom

let width = 900 - margin.left - margin.right

let svg = d3
  .select('#bubble-map')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

let projection = d3.geoAlbersUsa()
var colorScale = d3.scaleOrdinal().range([
  '#ec913f',
  '#99979a',
  '#c1619c',
  '#2a83c2',
  '#de473a',
  '#51a74c',
  '#d7c54f',
  '#fdeed7'])

let radiusScale = d3
  .scaleSqrt()
  .domain([0, 5000])
  .range([0, 15])

// out geoPath needs a PROJECTION variable
let path = d3.geoPath().projection(projection)

Promise.all([
  d3.json(require('/data/us_states.topojson')),
  d3.csv(require('/data/powerplants.csv'))
])
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready([json, datapoints]) {
  let states = topojson.feature(json, json.objects.us_states)

  projection.fitSize([width, height], states)

  svg
    .append('g')
    .selectAll('.state')
    .data(states.features)
    .enter()
    .append('path')
    .attr('class', 'state')
    .attr('d', path)
    .attr('fill', '#e1e1e1')

  svg
    .append('g')
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', d => radiusScale(d.Total_MW))
    .attr('transform', d => {
      let coords = projection([d.Longitude, d.Latitude])
      return `translate(${coords})`
    }
    )
    .attr('fill', d => colorScale(d.PrimSource))
    .attr('opacity', 0.5)

  svg
    .append('g')
    .selectAll('.state-label')
    .data(states.features)
    .enter()
    .append('text')
    .attr('class', 'state-label')
    .attr('transform', d => `translate(${path.centroid(d)})`)
    .text(d => d.properties.abbrev)
    .attr('text-anchor', 'middle')
    .style('text-shadow', '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff')


  var legend = svg
    .append('g')
    .attr('transform', 'translate(-140, 100)')

  var legendScale = d3.scaleBand().domain(colorScale.domain()).range([0, 400])

  legend.selectAll('g')
    .data(colorScale.domain())
    .enter().append('g')
    .attr('transform', d => `translate(0,${legendScale(d)})`)
    .each(function(d) {
      let group = d3.select(this)

      group.append('circle').attr('r', 10).attr('fill', colorScale(d))
      group.append('text')
        .text(d.charAt(0).toUpperCase() + d.slice(1))
        .attr('alignment-baseline', 'middle')
        .attr('font-size', 12)
        .attr('dx', 14)
    })
}