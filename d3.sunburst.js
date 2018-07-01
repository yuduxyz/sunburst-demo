(function () {
  // Variables
  var WIDTH = 500
  var HEIGHT = 500
  var color = d3.scaleOrdinal(d3.schemeCategory20b)

  var Sunburst = function (options) {
    this.width = options.width || WIDTH
    this.height = options.height || HEIGHT
    this.radius = Math.min(this.width, this.height) / 2
    this.data = options.data
    this.options = options
  }

  Sunburst.prototype.init = function () {
    // Data strucure
    var partition = d3.partition()
      .size([2 * Math.PI, this.radius])

    // Find data root
    this.root = d3.hierarchy(this.data)
      .sum(function (d) { return d.size })

    // Size arcs
    partition(this.root)
    console.log(this.root)

    // Create primary <g> element
    this.chartLayer = d3.select(this.options.el)
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')')

    this.addConcentricCircles()
    return this
  }

  Sunburst.prototype.render = function () {
    var arc = d3.arc()
      .startAngle(function (d) { return d.x0 })
      .endAngle(function (d) { return d.x1 })
      .innerRadius(function (d) { return d.y0 })
      .outerRadius(function (d) { return d.y1 })

    // Put it all together
    this.chartLayer.selectAll('path')
      .data(this.root.descendants())
      .enter().append('path')
      .attr('display', function (d) { return d.depth ? null : 'none' })
      .attr('d', arc)
      .style('stroke', '#fff')
      .style('fill', function (d) { return color((d.children ? d : d.parent).data.name) })

    return this
  }

  Sunburst.prototype.bindEvents = function () {

    return this
  }

  Sunburst.prototype.addConcentricCircles = function () {
    var configs = [{
      arcConfig: [25, 27, 0, 2 * Math.PI],
      color: 'rgb(104, 190, 146)'
    }, {
      arcConfig: [50, 52, 0, 2 * Math.PI],
      color: 'rgb(228, 214, 61)'
    }, {
      arcConfig: [75, 77, 0, 2 * Math.PI],
      color: 'rgb(149, 149, 53)'
    }, {
      arcConfig: [500, 510, 0, 2 * Math.PI],
      color: 'rgb(204, 204, 204)'
    }, {
      arcConfig: [610, 760, 0, 2 * Math.PI],
      color: 'rgb(204, 204, 204)'
    }, {
      arcConfig: [870, 1020, 0, 2 * Math.PI],
      color: 'rgb(204, 204, 204)'
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

  function drawArc (innerR, outerR, startAngle, endAngle) {
    var arc = d3.arc()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .startAngle(startAngle)
      .endAngle(endAngle)

    return arc()
  }

  window.Sunburst = function (options) {
    if (!options.data || !options.el) {
      return
    }
    var sunburst = new Sunburst(options)
    sunburst.init()
    // .render()
    // .bindEvents()
  }
})()