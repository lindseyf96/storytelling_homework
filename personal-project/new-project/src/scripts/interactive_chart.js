import * as d3 from 'd3'

const margin = { top: 50, left: 50, right: 50, bottom: 50 }
const height = 550 - margin.top - margin.bottom
const width = 500 - margin.left - margin.right

const svg = d3
  .select('#interactive_chart')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  //scales

  var bandScale = d3.scaleBand()
  .range([0, width])

  var category1Scale = d3.scalePoint()
  .domain(['lawful','neutral','chaotic'])
  .range([0, width])

  var category2Scale = d3.scalePoint()
  .domain(['good','neutral','evil'])
  .range([0, height])


  d3.csv(require('../data/chart.csv')).then(ready)

  function ready(datapoints) {
    let images = datapoints.map(d => d.image)
    bandScale.domain(images)

    svg
      .selectAll('image')
      .data(datapoints)
      .enter()
      .append('image')
      .attr('xlink:href', d => "/images/" + d.image)
      .attr("height", 50)
      // .attr("transform", "translate(-150, 0)")
      .attr('x', 0)
      .attr('y', 0)

      svg.selectAll('image')
        .transition()
        .delay(1500)
        .duration(750)
        .attr('x', d => category1Scale(d.category1))
        .attr('y', d => category2Scale(d.category2))

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', -40)
      .attr('y', -20)
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', 140)
      .attr('y', -20)
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', 320)
      .attr('y', -20)
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', -40)
      .attr('y', 175)
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', 140)
      .attr('y',175)
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', 320)
      .attr('y', 175)
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', -40)
      .attr('y', 374)
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', 140)
      .attr('y',374)
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', 320)
      .attr('y', 374)
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("text")
        .attr("x", -25)             
        .attr("y", 0 - (margin.top / 2))
        .style("font-size", "16px") 
        .text("Lawful Good")
      
      svg.append("text")
      .attr("x", 150)             
      .attr("y", 0 - (margin.top / 2))
      .style("font-size", "16px") 
      .text("Neutral Good")

      svg.append("text")
        .attr("x", 330)             
        .attr("y", 0 - (margin.top / 2))
        .style("font-size", "16px") 
        .text("Chaotic Good")

      svg.append("text")
      .attr("x", -30)             
      .attr("y", 170)
      .style("font-size", "16px") 
      .text("Lawful Neutral")
      
      svg.append("text")
      .attr("x", 155)             
      .attr("y", 170)
      .style("font-size", "16px") 
      .text("True Neutral")

      svg.append("text")
        .attr("x", 325)             
        .attr("y", 170)
        .style("font-size", "16px") 
        .text("Chaotic Neutral")

      svg.append("text")
      .attr("x", -20)             
      .attr("y", 370)
      .style("font-size", "16px") 
      .text("Lawful Evil")
      
      svg.append("text")
      .attr("x", 157)             
      .attr("y", 370)
      .style("font-size", "16px") 
      .text("Neutral Evil")

      svg.append("text")
        .attr("x", 340)             
        .attr("y", 370)
        .style("font-size", "16px") 
        .text("Chaotic Evil")
}