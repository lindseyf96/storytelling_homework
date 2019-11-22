import * as d3 from 'd3'

const margin = { top: 0, left: 0, right: 0, bottom: 0 }
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
  .padding(0.5)

  var category2Scale = d3.scalePoint()
  .domain(['good','neutral','evil'])
  .range([0, height])
  .padding(0.5)


  d3.csv(require('../data/chart.csv')).then(ready)

  function ready(datapoints) {
    let images = datapoints.map(d => d.image)
    bandScale.domain(images)

    svg
      .selectAll('image')
      .data(datapoints)
      .enter()
      .append('g')
      .attr("transform", "translate(-25,-25)")
      .append('image')
      .attr('xlink:href', d => "/images/" + d.image)
      .attr("height", 50)
      .style('opacity', 0)
      // .attr('x', d => Math.random()*width)
      // .attr('y', d => Math.random()*height)
      .attr('x', width/2)
      .attr('y', height)



    d3.select('#chart-step1').on('stepin', () => {
      svg.selectAll('image')
        .transition()
        // .delay(50)
        .duration(750)
        .style('opacity', 1)
        .attr('x', d => category1Scale(d.category1))
        .attr('y', d => category2Scale(d.category2))
        .attr("transform", d => `translate(${d.x},${d.y})`) 
    
  })


      const boxSize = 125  

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', category1Scale("lawful"))
      .attr('y', category2Scale("good"))
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', category1Scale("neutral"))
      .attr('y', category2Scale("good"))
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', category1Scale("chaotic"))
      .attr('y', category2Scale("good"))
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', category1Scale("lawful"))
      .attr('y', category2Scale("neutral"))
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', category1Scale("neutral"))
      .attr('y', category2Scale("neutral"))
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', category1Scale("chaotic"))
      .attr('y', category2Scale("neutral"))
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', category1Scale("lawful"))
      .attr('y', category2Scale("evil"))
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', category1Scale("neutral"))
      .attr('y', category2Scale("evil"))
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("rect")
      .attr("width", 125)
      .attr("height", 125)
      .attr('x', category1Scale("chaotic"))
      .attr('y', category2Scale("evil"))
      .attr("fill", "none")
      .attr('stroke', 'black')

      svg.append("text")
      .attr('x', category1Scale("lawful"))
      .attr('y', category2Scale("good"))
        .style("font-size", "16px") 
        .text("Lawful Good")
      
      svg.append("text")
      .attr('x', category1Scale("neutral"))
      .attr('y', category2Scale("good"))
      .style("font-size", "16px") 
      .text("Neutral Good")

      svg.append("text")
      .attr('x', category1Scale("chaotic"))
      .attr('y', category2Scale("good"))
        .style("font-size", "16px") 
        .text("Chaotic Good")

      svg.append("text")
      .attr('x', category1Scale("lawful"))
      .attr('y', category2Scale("neutral"))
      .style("font-size", "16px") 
      .text("Lawful Neutral")
      
      svg.append("text")
      .attr('x', category1Scale("neutral"))
      .attr('y', category2Scale("neutral"))
      .style("font-size", "16px") 
      .text("True Neutral")

      svg.append("text")
      .attr('x', category1Scale("chaotic"))
      .attr('y', category2Scale("neutral"))
        .style("font-size", "16px") 
        .text("Chaotic Neutral")

      svg.append("text")
      .attr('x', category1Scale("lawful"))
      .attr('y', category2Scale("evil"))
      .style("font-size", "16px") 
      .text("Lawful Evil")
      
      svg.append("text")
      .attr('x', category1Scale("neutral"))
      .attr('y', category2Scale("evil"))
      .style("font-size", "16px") 
      .text("Neutral Evil")

      svg.append("text")
      .attr('x', category1Scale("chaotic"))
      .attr('y', category2Scale("evil"))
        .style("font-size", "16px") 
        .text("Chaotic Evil")
      
      svg.selectAll('rect')
        .attr('transform', `translate(${-boxSize/2},${-boxSize/2})`)

      svg.selectAll('text')
        .attr('text-anchor', 'middle')
        .attr("transform", "translate(0,-70)")
 


}
