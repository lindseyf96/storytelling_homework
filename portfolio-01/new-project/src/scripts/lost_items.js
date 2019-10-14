import * as d3 from 'd3'
import d3Tip from "d3-tip"
d3.tip = d3Tip


// import it as d3Annotation
import d3Annotation from 'd3-svg-annotation'

// NO
// const type = d3.annotationCalloutCircle

// YES
// const type = d3Annotation.annotationCalloutCircle

// NO
// const makeAnnotations = d3.annotation()
//  .annotations(annotations)

// YES
// const makeAnnotations = d3Annotation.annotation()
//   .annotations(annotations)



var margin = {top: 50, right: 50, bottom: 50, left: 50},
  width = 750 - margin.left - margin.right,
  height = 445 - margin.top - margin.bottom;

var svg = d3.select("#lost_items")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

        var y_scale = d3
        .scaleLinear()
        .domain([0, 70000])
        .range([height, 0])
    
      var x_scale = d3
        .scaleBand()
        .domain([
          'MTA Metrocard',
          'Cell phone ',
          'Wallet',
          'Debit Card',
          'Cash',
          'All Other Misc Items ',
          'Credit Card',
          'Drivers License',
          'School ID',
          'Shopping bag'
        ])
        .range([0, width])
    
      var y_axis = d3.axisLeft(y_scale)
      svg
        .append('g')
        .attr('class', 'axis y-axis')
        .call(y_axis)
    
      var x_axis = d3.axisBottom(x_scale)
      svg
        .append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(x_axis)
      
    
      // Ready function

      var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return ` <span style='color:navy'>${d._count}</span>`;
  })

  svg.call(tip);
    
// Read data
d3.csv(require('../data/lost_items.csv'))
  .then(ready)
  .catch(function(err) {
    console.log('Failed with', err)
  })
      
        function top10(datapoints){  //sorting to top 10 function
          datapoints.sort(function(a, b) {
                           return parseFloat(b['_count']) - parseFloat(a['_count']);
                         });
          return datapoints.slice(0, 10); 
        }
      
data = top10(datapoints);
    
function ready(data) {
          
        // Add and style your marks here
        svg
          .selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('fill', '#ADD8E6')
          .attr('x', function(d) {
            console.log(d._SubCategory)
            return x_scale(d._SubCategory)
          })
          .attr('y', function(d) {
            return y_scale(d._count)
          })
          .attr('height', function(d) {
            return height - y_scale(d._count)
          })
          .attr('width', 40)
          .attr('fill', '#4cc1fc')
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
      
        }

        // add your annotations

  // const annotations = [
  //   {
  //     note: {
  //       label: 'Longer text to show text wrapping',
  //       title: 'Here is an annotation'
  //     },
  //     // copying what our data looks like
  //     // this is the point i want to annotate
  //     data: {_SubCategory: 'MTA Metrocard'},
  //     dx: 50,
  //     dy: 20,
  //     color: 'red'
  //   }]

  //   const makeAnnotations = d3Annotation.annotation()
  // .accessors({
  //   x: d => xPositionScale(d._SubCategory),
  //   y: d => yPositionScale(d._count)
  // })
  // .annotations(annotations)
  
  // svg.call(makeAnnotations)

  const x_axis = d3.axisBottom(xPositionScale).tickFormat(d3.format('d'))



