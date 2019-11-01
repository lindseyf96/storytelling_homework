import * as d3 from 'd3'
import d3Tip from 'd3-tip'
// d3.sankey = d3Sankey
// import * as sankey from 'd3-sankey'
// import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey'
d3.tip = d3Tip

// var sankey = Sankey()

const sankey = function() {
  const sankey = {}
  let nodeWidth = 24
  let nodePadding = 8
  let size = [1, 1]
  let nodes = []
  let links = []

  sankey.nodeWidth = function(_) {
    if (!arguments.length) return nodeWidth
    nodeWidth = +_
    return sankey
  }

  sankey.nodePadding = function(_) {
    if (!arguments.length) return nodePadding
    nodePadding = +_
    return sankey
  }

  sankey.nodes = function(_) {
    if (!arguments.length) return nodes
    nodes = _
    return sankey
  }

  sankey.links = function(_) {
    if (!arguments.length) return links
    links = _
    return sankey
  }

  sankey.size = function(_) {
    if (!arguments.length) return size
    size = _
    return sankey
  }

  sankey.layout = function(iterations) {
    computeNodeLinks()
    computeNodeValues()
    computeNodeBreadths()
    computeNodeDepths(iterations)
    computeLinkDepths()
    return sankey
  }

  sankey.relayout = function() {
    computeLinkDepths()
    return sankey
  }

  sankey.link = function() {
    let curvature = 0.5

    function link(d) {
      const x0 = d.source.x + d.source.dx
      const x1 = d.target.x
      const xi = d3.interpolateNumber(x0, x1)
      const x2 = xi(curvature)
      const x3 = xi(1 - curvature)
      const y0 = d.source.y + d.sy + d.dy / 2
      const y1 = d.target.y + d.ty + d.dy / 2
      return (
        'M' +
        x0 +
        ',' +
        y0 +
        'C' +
        x2 +
        ',' +
        y0 +
        ' ' +
        x3 +
        ',' +
        y1 +
        ' ' +
        x1 +
        ',' +
        y1
      )
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature
      curvature = +_
      return link
    }

    return link
  }

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks() {
    nodes.forEach(function(node) {
      node.sourceLinks = []
      node.targetLinks = []
    })
    links.forEach(function(link) {
      let source = link.source
      let target = link.target
      if (typeof source === 'number') source = link.source = nodes[link.source]
      if (typeof target === 'number') target = link.target = nodes[link.target]
      source.sourceLinks.push(link)
      target.targetLinks.push(link)
    })
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues() {
    nodes.forEach(function(node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),
        d3.sum(node.targetLinks, value)
      )
    })
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths() {
    let remainingNodes = nodes
    let nextNodes
    let x = 0

    while (remainingNodes.length) {
      nextNodes = []
      remainingNodes.forEach(function(node) {
        node.x = x
        node.dx = nodeWidth
        node.sourceLinks.forEach(function(link) {
          if (nextNodes.indexOf(link.target) < 0) {
            nextNodes.push(link.target)
          }
        })
      })
      remainingNodes = nextNodes
      ++x
    }

    //
    moveSinksRight(x)
    scaleNodeBreadths((size[0] - nodeWidth) / (x - 1))
  }

  function moveSourcesRight() {
    nodes.forEach(function(node) {
      if (!node.targetLinks.length) {
        node.x =
          d3.min(node.sourceLinks, function(d) {
            return d.target.x
          }) - 1
      }
    })
  }

  function moveSinksRight(x) {
    nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1
      }
    })
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(function(node) {
      node.x *= kx
    })
  }

  function computeNodeDepths(iterations) {
    const nodesByBreadth = d3
      .nest()
      .key(function(d) {
        return d.x
      })
      .sortKeys(d3.ascending)
      .entries(nodes)
      .map(function(d) {
        return d.values
      })

    //
    initializeNodeDepth()
    resolveCollisions()
    for (let alpha = 1; iterations > 0; --iterations) {
      relaxRightToLeft((alpha *= 0.99))
      resolveCollisions()
      relaxLeftToRight(alpha)
      resolveCollisions()
    }

    function initializeNodeDepth() {
      const ky = d3.min(nodesByBreadth, function(nodes) {
        return (
          (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value)
        )
      })

      nodesByBreadth.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y = i
          node.dy = node.value * ky
        })
      })

      links.forEach(function(link) {
        link.dy = link.value * ky
      })
    }

    function relaxLeftToRight(alpha) {
      nodesByBreadth.forEach(function(nodes, breadth) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            const y =
              d3.sum(node.targetLinks, weightedSource) /
              d3.sum(node.targetLinks, value)
            node.y += (y - center(node)) * alpha
          }
        })
      })

      function weightedSource(link) {
        return center(link.source) * link.value
      }
    }

    function relaxRightToLeft(alpha) {
      nodesByBreadth
        .slice()
        .reverse()
        .forEach(function(nodes) {
          nodes.forEach(function(node) {
            if (node.sourceLinks.length) {
              const y =
                d3.sum(node.sourceLinks, weightedTarget) /
                d3.sum(node.sourceLinks, value)
              node.y += (y - center(node)) * alpha
            }
          })
        })

      function weightedTarget(link) {
        return center(link.target) * link.value
      }
    }

    function resolveCollisions() {
      nodesByBreadth.forEach(function(nodes) {
        let node
        let dy
        let y0 = 0
        const n = nodes.length
        let i

        // Push any overlapping nodes down.
        nodes.sort(ascendingDepth)
        for (i = 0; i < n; ++i) {
          node = nodes[i]
          dy = y0 - node.y
          if (dy > 0) node.y += dy
          y0 = node.y + node.dy + nodePadding
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y0 - nodePadding - size[1]
        if (dy > 0) {
          y0 = node.y -= dy

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i]
            dy = node.y + node.dy + nodePadding - y0
            if (dy > 0) node.y -= dy
            y0 = node.y
          }
        }
      })
    }

    function ascendingDepth(a, b) {
      return a.y - b.y
    }
  }

  function computeLinkDepths() {
    nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetDepth)
      node.targetLinks.sort(ascendingSourceDepth)
    })
    nodes.forEach(function(node) {
      let sy = 0
      let ty = 0
      node.sourceLinks.forEach(function(link) {
        link.sy = sy
        sy += link.dy
      })
      node.targetLinks.forEach(function(link) {
        link.ty = ty
        ty += link.dy
      })
    })

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y
    }
  }

  function center(node) {
    return node.y + node.dy / 2
  }

  function value(link) {
    return link.value
  }

  return sankey
}

const margin = { top: 10, right: 10, bottom: 10, left: 10 }
const width = 450 - margin.left - margin.right
const height = 480 - margin.top - margin.bottom

const sankey1 = sankey()
  .nodeWidth(36)
  .nodePadding(80)
  .size([width, height])

console.log(sankey1)
console.log(sankey1.nodePadding())

const svg = d3
  .select('#chart-sankey')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// const path = sankey1.link()

// // Color scale used
// const color = d3.scaleOrdinal(d3.schemeCategory20)

// // Set the sankey diagram properties
// const sankey = d3
//   .sankey()
//   .nodeWidth(36)
//   .nodePadding(290)
//   .size([width, height])

// // load the data
// d3.json(
//   'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_sankey.json',
//   function(error, graph) {
//     // Constructs a new Sankey generator with the default settings.
//     sankey
//       .nodes(graph.nodes)
//       .links(graph.links)
//       .layout(1)

//     // add in the links
//     const link = svg
//       .append('g')
//       .selectAll('.link')
//       .data(graph.links)
//       .enter()
//       .append('path')
//       .attr('class', 'link')
//       .attr('d', sankey.link())
//       .style('stroke-width', function(d) {
//         return Math.max(1, d.dy)
//       })
//       .sort(function(a, b) {
//         return b.dy - a.dy
//       })

//     // add in the nodes
//     const node = svg
//       .append('g')
//       .selectAll('.node')
//       .data(graph.nodes)
//       .enter()
//       .append('g')
//       .attr('class', 'node')
//       .attr('transform', function(d) {
//         return 'translate(' + d.x + ',' + d.y + ')'
//       })
//       .call(
//         d3
//           .drag()
//           .subject(function(d) {
//             return d
//           })
//           .on('start', function() {
//             this.parentNode.appendChild(this)
//           })
//           .on('drag', dragmove)
//       )

//     // add the rectangles for the nodes
//     node
//       .append('rect')
//       .attr('height', function(d) {
//         return d.dy
//       })
//       .attr('width', sankey.nodeWidth())
//       .style('fill', function(d) {
//         return (d.color = color(d.name.replace(/ .*/, '')))
//       })
//       .style('stroke', function(d) {
//         return d3.rgb(d.color).darker(2)
//       })
//       // Add hover text
//       .append('title')
//       .text(function(d) {
//         return d.name + '\n' + 'There is ' + d.value + ' stuff in this node'
//       })

//     // add in the title for the nodes
//     node
//       .append('text')
//       .attr('x', -6)
//       .attr('y', function(d) {
//         return d.dy / 2
//       })
//       .attr('dy', '.35em')
//       .attr('text-anchor', 'end')
//       .attr('transform', null)
//       .text(function(d) {
//         return d.name
//       })
//       .filter(function(d) {
//         return d.x < width / 2
//       })
//       .attr('x', 6 + sankey.nodeWidth())
//       .attr('text-anchor', 'start')

//     // the function for moving the nodes
//     function dragmove(d) {
//       d3.select(this).attr(
//         'transform',
//         'translate(' +
//           d.x +
//           ',' +
//           (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) +
//           ')'
//       )
//       sankey.relayout()
//       link.attr('d', sankey.link())
//     }
//   }
// )

const units = 'Widgets'

const formatNumber = d3.format(',.0f') // zero decimal places
const format = function(d) {
  return formatNumber(d) + ' ' + units
}
const color = d3.scaleOrdinal(d3.schemeCategory10)

const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  // .x(d.Number)
  .offset([0, 50])
  .html(function(d) {
    return ` <span style='color:black'>Number of people: ${d.value}</span>`
  })
  .direction('e')

svg.call(tip)


d3.json(require('../data/sankey.json'))
  .then(ready)
  .catch(err => console.log('Failed on', err))
function ready(datapoints) {
  sankey1
    .nodes(datapoints.nodes)
    .links(datapoints.links)
    .layout(1)

  console.log(sankey1)
  console.log(sankey1.links(), 'links')

  const link = svg
    .append('g')
    .selectAll('.link')
    .data(datapoints.links)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', sankey1.link())
    .style('stroke-width', function(d) {
      return Math.max(1, d.dy)
    })
    .sort(function(a, b) {
      return b.dy - a.dy
    })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

  const node = svg
    .append('g')
    .selectAll('.node')
    .data(datapoints.nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function(d) {
      return 'translate(' + d.x + ',' + d.y + ')'
    })
    .call(
      d3
        .drag()
        .subject(function(d) {
          return d
        })
        .on('start', function() {
          this.parentNode.appendChild(this)
        })
        .on('drag', dragmove)
    )

  node
    .append('rect')
    .attr('height', function(d) {
      // return d.dy
      return d.dy
    })
    .attr('width', sankey1.nodeWidth())
    .style('fill', function(d) {
      return (d.color = color(d.name.replace(/ .*/, '')))
    })
    // .style('fill', '#67BEA2')
    .style('stroke', function(d) {
      return d3.rgb(d.color).darker(2)
    })
    // Add hover text
    .append('title')
    .text(function(d) {
      return d.name + '\n' + 'There is ' + d.value + ' stuff in this node'
    })

  // add in the title for the nodes
  node
    .append('text')
    .attr('x', -6)
    .attr('y', function(d) {
      return d.dy / 2
    })
    .attr('dy', '.35em')
    .attr('text-anchor', 'end')
    .attr('transform', null)
    .text(function(d) {
      return d.name
    })
    .filter(function(d) {
      return d.x < width / 2
    })
    .attr('x', 6 + sankey1.nodeWidth())
    .attr('text-anchor', 'start')

  function dragmove(d) {
    d3.select(this).attr(
      'transform',
      'translate(' +
        // (d.x = Math.max(0, Math.min(width - d.dy, d3.event.y))) +
        d.x +
        ',' +
        (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) +
        ')'
    )
    sankey1.relayout()
    link.attr('d', sankey1.link())
  }
  // console.log(sankey1.links)

  // d3.csv(
  //   require('../data/sankey.csv', function(error, data) {
  // graph = { nodes: [], links: [] }

  // data.forEach(function(d) {
  //   graph.nodes.push({ name: d.source })
  //   graph.nodes.push({ name: d.target })
  //   graph.links.push({ source: d.source, target: d.target, value: +d.value })
  // })

  // // return only the distinct / unique nodes
  // graph.nodes = d3.keys(
  //   d3
  //     .nest()
  //     .key(function(d) {
  //       return d.name
  //     })
  //     .map(graph.nodes)
  // )

  // // loop through each link replacing the text with its index from node
  // graph.links.forEach(function(d, i) {
  //   graph.links[i].source = graph.nodes.indexOf(graph.links[i].source)
  //   graph.links[i].target = graph.nodes.indexOf(graph.links[i].target)
  // })

  // // now loop through each nodes to make nodes an array of objects
  // // rather than an array of strings
  // graph.nodes.forEach(function(d, i) {
  //   graph.nodes[i] = { name: d }
  // })

  // sankey
  //   .nodes(graph.nodes)
  //   .links(graph.links)
  //   .layout(32)

  // add in the links
  // const link = svg
  //   .append('g')
  //   .selectAll('.link')
  //   .data(graph.links)
  //   .enter()
  //   .append('path')
  //   .attr('class', 'link')
  //   .attr('d', path)
  //   .style('stroke-width', function(d) {
  //     return Math.max(1, d.dy)
  //   })
  //   .sort(function(a, b) {
  //     return b.dy - a.dy
  //   })

  // add the link titles
  // link.append('title').text(function(d) {
  //   return d.source.name + ' → ' + d.target.name + '\n' + format(d.value)
  // })

  // // add in the nodes
  // const node = svg
  //   .append('g')
  //   .selectAll('.node')
  //   .data(graph.nodes)
  //   .enter()
  //   .append('g')
  //   .attr('class', 'node')
  //   .attr('transform', function(d) {
  //     return 'translate(' + d.x + ',' + d.y + ')'
  //   })
  //   .call(
  //     d3.behavior
  //       .drag()
  //       .origin(function(d) {
  //         return d
  //       })
  //       .on('dragstart', function() {
  //         this.parentNode.appendChild(this)
  //       })
  //       .on('drag', dragmove)
  //   )

  // // add the rectangles for the nodes
  // node
  //   .append('rect')
  //   .attr('height', function(d) {
  //     return d.dy
  //   })
  //   .attr('width', sankey.nodeWidth())
  //   .style('fill', function(d) {
  //     return (d.color = color(d.name.replace(/ .*/, '')))
  //   })
  //   .style('stroke', function(d) {
  //     return d3.rgb(d.color).darker(2)
  //   })
  //   .append('title')
  //   .text(function(d) {
  //     return d.name + '\n' + format(d.value)
  //   })

  // // add in the title for the nodes
  // node
  //   .append('text')
  //   .attr('x', -6)
  //   .attr('y', function(d) {
  //     return d.dy / 2
  //   })
  //   .attr('dy', '.35em')
  //   .attr('text-anchor', 'end')
  //   .attr('transform', null)
  //   .text(function(d) {
  //     return d.name
  //   })
  //   .filter(function(d) {
  //     return d.x < width / 2
  //   })
  //   .attr('x', 6 + sankey.nodeWidth())
  //   .attr('text-anchor', 'start')

  // // the function for moving the nodes
  // function dragmove(d) {
  //   d3.select(this).attr(
  //     'transform',
  //     'translate(' +
  //       d.x +
  //       ',' +
  //       (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) +
  //       ')'
  //   )
  //   sankey.relayout()
  //   link.attr('d', path)
  // }
}
