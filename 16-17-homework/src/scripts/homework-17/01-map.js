import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 500 - margin.top - margin.bottom

let width = 900 - margin.left - margin.right

let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  let colorScale = d3
  .scaleSequential(d3.interpolateCool)
  .domain([0, 600000])
  .clamp(true)

const projection = d3.geoMercator()
const graticule = d3.geoGraticule()
const path = d3.geoPath().projection(projection)


  Promise.all([
    d3.json(require('/data/world.topojson')),
    d3.csv(require('/data/world-cities.csv'))
  ])
    .then(ready)
    .catch(err => console.log('Failed on', err))
  
    function ready([json, datapoints]) {
    console.log('What is our data?')
    // console.log(json)
    
    const countries = topojson.feature(json, json.objects.countries)

    svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "black")

    console.log(graticule())
    svg.append('path')
        .datum(graticule())
        .attr('d', path)
        .attr('stroke', 'lightgrey')
        .attr('fill', 'none')

  
  console.log(json)
  console.log(countries)
  // countries is not a list
  // but countries.features is!!!!
  // (that's just how GeoJSON works)
  svg
    .selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', 'black')


svg.selectAll('circle')
.data(datapoints)
.enter()
.append('circle')
.attr('r', .8)
.attr('transform', function(d){
  const coords = [d.lng, d.lat]
  // console.log(projection(coords))
  return `translate(${projection(coords)})`
})
.attr('fill', d => colorScale(d.population))


}