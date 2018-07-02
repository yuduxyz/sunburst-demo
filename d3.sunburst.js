(function () {
  // Variables
  var WIDTH = 500
  var HEIGHT = 500
  var color = d3.scaleOrdinal(d3.schemeCategory20b)
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
      .sum(function (d) { return d.size || 1  })

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
    this.placeLogos()

    var arc = d3.arc()
      .startAngle(function (d) { return d.x0 })
      .endAngle(function (d) { return d.x1 })
      .innerRadius(function (d) { return d.y0 })
      .outerRadius(function (d) { return d.y1 })

    // Put it all together
    this.chartLayer.append('g')
      .classed('index-area', true)
      .selectAll('path')
      .data(this.root.descendants())
      .enter().append('path')
      .attr('display', function (d) { return d.depth ? null : 'none' })
      .attr('d', arc)
      .style('stroke-width', 5)
      .style('stroke', '#fff')
      .style('fill', BASIC_COLOR)

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

  function drawArc (innerR, outerR, startAngle, endAngle) {
    var arc = d3.arc()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .startAngle(startAngle)
      .endAngle(endAngle)

    return arc()
  }

  /** d3.partition 不能对奇数个节点均匀分布成环，自己实现之 */
  function partition (data, innerR, outerR) {
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