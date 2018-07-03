(function () {
  // Variables
  var WIDTH = 500
  var HEIGHT = 500
  var BASIC_COLOR = 'rgb(204, 204, 204)'

  var Sunburst = function (options) {
    this.width = options.width || WIDTH
    this.height = options.height || HEIGHT
    this.data = options.data
    this.options = options
  }

  Sunburst.prototype.init = function () {
    // Find data root
    this.root = d3.hierarchy(this.data)
      .sum(function (d) { return d.size || 1 })

    // Size arcs
    partition(this.root.children, 155, 192)
    console.log(this.root)

    // Create primary <g> element
    this.chartLayer = d3.select(this.options.el)
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')')

    return this
  }

  Sunburst.prototype.render = function () {
    this.addConcentricCircles()
    this.placeIndexes()
    this.placeLogos()

    return this
  }

  Sunburst.prototype.bindEvents = function () {

    return this
  }

  Sunburst.prototype.addConcentricCircles = function () {
    var configs = [{
      arcConfig: [25, 27, 0, 2 * Math.PI],
      color: '#60B5AA'
    }, {
      arcConfig: [50, 52, 0, 2 * Math.PI],
      color: '#E4D63D'
    }, {
      arcConfig: [75, 77, 0, 2 * Math.PI],
      color: '#88B13E'
    }, {
      arcConfig: [500, 510, 0, 2 * Math.PI],
      color: BASIC_COLOR
    }, {
      arcConfig: [630, 760, 0, 2 * Math.PI],
      color: BASIC_COLOR
    }, {
      arcConfig: [890, 1100, 0, 2 * Math.PI],
      color: BASIC_COLOR
    }]
    this.chartLayer.append('g')
      .classed('concentric-circle', true)
      .selectAll('path')
      .data(configs)
      .enter()
      .append('path')
      .attr('d', function (d) {
        return drawArc.apply(null, d.arcConfig)
      })
      .attr('fill', function (d) { return d.color })
  }

  Sunburst.prototype.placeIndexes = function () {
    var arc = d3.arc()
      .startAngle(function (d) { return d.x0 })
      .endAngle(function (d) { return d.x1 })
      .innerRadius(function (d) { return d.y0 })
      .outerRadius(function (d) { return d.y1 })

    // group
    var indexEnter = this.chartLayer.selectAll('g')
      .data(this.root.descendants())
      .enter()
      .append('g')
      .classed('index-area', true)
      .attr('data-key', function (d) { return d.data.key })

    // arc
    indexEnter.append('path')
      .attr('display', function (d) { return d.depth ? null : 'none' })
      .attr('d', arc)
      .style('stroke-width', 5)
      .style('stroke', '#fff')
      .style('fill', BASIC_COLOR)

    // line
    indexEnter.append('path')
      .attr('d', function (d) {
        var alpha = d.x1 - 0.035
        var r = d.y1 - 5
        var len = 15
        var fromX = r * Math.sin(alpha)
        var fromY = -r * Math.cos(alpha)
        var toX = (r + len) * Math.sin(alpha)
        var toY = -(r + len) * Math.cos(alpha)
        return drawLine([fromX, fromY], [toX, toY])
      })
      .attr('stroke', BASIC_COLOR)
      .attr('stroke-width', 8)

    // circle
    indexEnter.append('path')
      .attr('d', function (d) { return drawArc(0, 8, 0, 2 * Math.PI) })
      .attr('transform', function (d) {
        var alpha = d.x1 - 0.035
        var r = d.y1 - 5
        var len = 15
        var shiftX = (r + len) * Math.sin(alpha)
        var shiftY = -(r + len) * Math.cos(alpha)
        return 'translate(' + shiftX + ',' + shiftY + ')'
      })
      .attr('fill', BASIC_COLOR)

    // dash
    indexEnter.append('path')
      .attr('d', function (d) {
        var alpha = (d.x1 - d.x0) / 2 + d.x0
        var r = d.y1 + 30
        var len = 270
        var fromX = r * Math.sin(alpha)
        var fromY = -r * Math.cos(alpha)
        var toX = (r + len) * Math.sin(alpha)
        var toY = -(r + len) * Math.cos(alpha)
        return drawLine([fromX, fromY], [toX, toY])
      })
      .attr('stroke', BASIC_COLOR)
      .attr('stroke-width', 4)
      .attr('stroke-dasharray', '1, 12')
      .attr('stroke-linecap', 'round')
      
    // name
    indexEnter.append('path')
      .attr('d', function (d) { return drawArc(0, 45, 0, 2 * Math.PI) })
      .attr('transform', function (d) {
        var alpha = d.x0
        var r = d.y1 + 65
        var shiftX = r * Math.sin(alpha)
        var shiftY = -r * Math.cos(alpha)
        return 'translate(' + shiftX + ',' + shiftY + ')'
      })
      .attr('fill', BASIC_COLOR)
    indexEnter.append('path')
      .attr('d', function (d) { return drawArc(35, 38, 0, 2 * Math.PI) })
      .attr('transform', function (d) {
        var alpha = d.x0
        var r = d.y1 + 65
        var shiftX = r * Math.sin(alpha)
        var shiftY = -r * Math.cos(alpha)
        return 'translate(' + shiftX + ',' + shiftY + ')'
      })
      .attr('fill', '#fff')
    // text
    indexEnter.append('text')
      .attr('transform', function (d) {
        var alpha = d.x0
        var r = d.y1 + 65
        var shiftX = r * Math.sin(alpha)
        var shiftY = -r * Math.cos(alpha)
        return 'translate(' + shiftX + ',' + shiftY + ')'
      })
      .classed('index-text', true)
      .each(function (d, i, g) {
        var name = d.data.name
        var el = d3.select(g[i])
        var nameArr = []
        if (name.length === 4) {
          nameArr = [name.slice(0, 2), name.slice(2)]
        } else {
          var i = 0
          while (i < name.length) {
            nameArr.push(name.slice(i, i + 3))
            i += 3
          }
        }
        var fontSize = 18
        el.selectAll('tspan')
          .data(nameArr)
          .enter()
          .append('tspan')
          .attr('font-size', fontSize)
          .text(function (d) { return d })
          .attr('x', function (d, i) {
            return -d.length * fontSize / 2
          })
          .attr('y', function (d, i) {
            if (nameArr.length === 1) {
              return fontSize / 2
            }
            var shiftY = i ? 2 : -2
            return fontSize * i + shiftY
          })
          .attr('fill', '#fff')
      })
  }

  Sunburst.prototype.placeLogos = function () {
    var logoWidth = 50
    this.chartLayer.append('g')
      .classed('logo-layer', true)
      .selectAll('image')
      .data(this.root.children)
      .enter().append('image')
      .attr('href', function (d) {
        return '/assets/' + d.data.key + '.svg'
      })
      .attr('width', logoWidth)
      .attr('height', logoWidth)
      .attr('transform', function (d) {
        var alpha = d.x0
        var r = 120
        var xShift = r * Math.sin(alpha) - logoWidth / 2
        var yShift = r * Math.cos(alpha) + logoWidth / 2
        return 'translate(' + xShift + ',' + -yShift + ')'
      })
  }

  function drawArc(innerR, outerR, startAngle, endAngle) {
    var arc = d3.arc()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .startAngle(startAngle)
      .endAngle(endAngle)

    return arc()
  }

  function drawLine(from, to) {
    return 'M' + from[0] + ',' + from[1] + 'L' + to[0] + ',' + to[1]
  }

  /** d3.partition 不能对奇数个节点均匀分布成环，自己实现之 */
  function partition(data, innerR, outerR) {
    if (!data.length) {
      return
    }
    var len = data.length
    var PI = Math.PI
    var unitRadian = 2 * PI / len
    var begin = 0

    data.forEach(function (d) {
      d.x0 = begin
      d.x1 = begin + unitRadian
      d.y0 = innerR
      d.y1 = outerR
      begin += unitRadian
    })
  }

  window.Sunburst = function (options) {
    if (!options.data || !options.el) {
      return
    }
    var sunburst = new Sunburst(options)
    sunburst.init()
      .render()
    // .bindEvents()
  }
})()