(function () {
  // Variables
  var WIDTH = 500
  var HEIGHT = 500
  var BASIC_COLOR = 'rgb(204, 204, 204)'
  var HIGHLIGHT_COLOR = '#88b13e'
  var DURATION = 500

  var captureMouseMove = true
  var activeKey = ''
  var activeMajor = ''

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
    this.placeMajors()

    return this
  }

  Sunburst.prototype.bindEvents = function () {
    var _this = this
    d3.selectAll('.name-group').on('click', function (d, i) {
      _this.showGroup(d.data.key, i)
      captureMouseMove = false
    })

    d3.selectAll('.majors text').on('click', function (d, i) {
      var e = d3.event
      activeMajor = d
      _this.highlightMajor(d)

      d3.json('./projects.json?key=' + d, function (data) {
        if (data.status) {
          throw Error(data.msg)
          return
        }
        _this.renderProjectList(data.data, e)
      })

      captureMouseMove = false
    })

    d3.select('body').on('click', function () {
      // console.log(d3.event) // 事件对象
      var className = d3.event.target.className || {}
      if (!className.baseVal || className.baseVal.indexOf('major-item') === -1) {
        d3.select('.project-list').remove()
        captureMouseMove = true
        activeMajor = ''
        _this.highlightMajor()
      }
    })

    d3.selectAll('body').on('mousemove', function () {
      if (!captureMouseMove) return

      var innerR = 140
      var outerR = 500
      var e = d3.event
      var shiftX = e.offsetX - _this.width / 2
      var shiftY = -e.offsetY + _this.height / 2
      var alpha = Math.atan(shiftX / shiftY)
      if (shiftX > 0 && shiftY < 0 || shiftX < 0 && shiftY < 0) {
        alpha = Math.PI + alpha
      }
      if (shiftX < 0 && shiftY > 0) {
        alpha = 2 * Math.PI + alpha
      }
      var r = Math.sqrt(shiftX * shiftX + shiftY * shiftY)
      if (r > outerR || r < innerR) {
        return
      }
      var curKey = ''
      var curIndex = null
      d3.selectAll('.index-area')
        .each(function (d, i, g) {
          var minRadian = d.x0 - (d.x1 - d.x0) / 2
          var maxRadian = d.x1 - (d.x1 - d.x0) / 2
          if (minRadian < alpha && maxRadian > alpha) {
            curKey = d.data.key
            curIndex = i
          }
        })

      if (curKey) {
        _this.showGroup(curKey, curIndex)
      }
    })

    d3.selectAll('.majors text').on('mouseover', function (d) {
      _this.highlightMajor(d)
    })
    d3.selectAll('.majors text').on('mouseleave', function () {
      _this.highlightMajor()
    })

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
      .startAngle(function (d) { return 2 * d.x0 - d.x1 })
      .endAngle(function (d) { return d.x0 })
      .innerRadius(function (d) { return d.y0 })
      .outerRadius(function (d) { return d.y1 })

    // group
    var indexEnter = this.chartLayer.append('g')
      .classed('index-container', true)
      .selectAll('g')
      .data(this.root.children)
      .enter()
      .append('g')
      .classed('index-area', true)
      .attr('data-key', function (d) { return d.data.key })

    // arc
    indexEnter.append('path')
      .classed('fill-highlight', true)
      .attr('display', function (d) { return d.depth ? null : 'none' })
      .attr('d', arc)
      .style('stroke-width', 5)
      .style('stroke', '#fff')
      .attr('fill', BASIC_COLOR)

    // line
    indexEnter.append('path')
      .classed('stroke-highlight', true)
      .attr('d', function (d) {
        var alpha = d.x0 - 0.035
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
      .classed('fill-highlight', true)
      .attr('d', function (d) { return drawArc(0, 8, 0, 2 * Math.PI) })
      .attr('transform', function (d) {
        var alpha = d.x0 - 0.035
        var r = d.y1 - 5
        var len = 15
        var shiftX = (r + len) * Math.sin(alpha)
        var shiftY = -(r + len) * Math.cos(alpha)
        return 'translate(' + shiftX + ',' + shiftY + ')'
      })
      .attr('fill', BASIC_COLOR)

    // dash
    indexEnter.append('path')
      .attr('class', 'dash stroke-highlight')
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
    var nameEnter = indexEnter.append('g')
      .classed('name-group', true)
      .style('cursor', 'pointer')
      .attr('data-key', function (d) { return d.data.key })
    nameEnter.append('path')
      .classed('fill-highlight', true)
      .attr('d', function (d) { return drawArc(0, 45, 0, 2 * Math.PI) })
      .attr('transform', function (d) {
        var alpha = d.x0
        var r = d.y1 + 65
        var shiftX = r * Math.sin(alpha)
        var shiftY = -r * Math.cos(alpha)
        return 'translate(' + shiftX + ',' + shiftY + ')'
      })
      .attr('fill', BASIC_COLOR)
    nameEnter.append('path')
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
    nameEnter.append('text')
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
              return fontSize / 2 - 2 // 位置微调
            }
            var shiftY = i ? 2 : -4 // 位置微调
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
      .classed('logo', true)
      .attr('data-key', function (d) { return d.data.key })
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

  /**
   * 使用了一个简单排列算法
   * 在扇形区域假想一个虚拟的内切圆，将专业尽量的排列在内切圆内部
   */
  Sunburst.prototype.placeMajors = function () {
    var MAJORDIS = 400 //  专业虚拟圆的圆心离同心圆圆心的距离
    var fontSize = 14
    var MAJORRADIUS = 85  // 虚拟圆半径
    var majorEnter = this.chartLayer.append('g')
      .classed('major-container', true)
      .selectAll('g')
      .data(this.root.children)
      .enter()
      .append('g')
      .classed('majors', true)
      .attr('data-key', function (d) { return d.data.key })
      .attr('display', 'none')
      .style('opacity', 0)
      .attr('transform', function (d) {
        var alpha = d.x0
        if (d.data.majors.length > 8) {
          majorDis = 420
        } else {
          majorDis = MAJORDIS
        }
        var shiftX = majorDis * Math.sin(alpha)
        var shiftY = -majorDis * Math.cos(alpha)
        return 'translate(' + shiftX + ',' + shiftY + ')'
      })
      .each(function (d, i, g) {
        if (d.data.majors.length > 8) {
          majorRadius = 90
        } else {
          majorRadius = MAJORRADIUS
        }
        var majors = d.data.majors
        var el = g[i]

        var alpha = d.x0
        var shiftX = majorDis * Math.sin(alpha)
        var shiftY = -majorDis * Math.cos(alpha)

        // 虚拟圆方程 x ^ 2 + y ^ 2 = majorRadius ^ 2
        var x = 0
        var y = - majorRadius

        var positionList = majors.map(function (m, i) {
          var pos = { x: x, y: y }
          getNewPosition(pos, m)
          x = pos.x + m.length * fontSize + 20  // 专业之间有 20px 间距
          y = pos.y

          return pos
        })

        d3.select(el).selectAll('line')
          .data(majors)
          .enter()
          .append('line')
          .classed('major-item', true)
          .attr('data-key', function (d) { return d })
          .attr('x1', function (d, i) {
            return positionList[i].x
          })
          .attr('x2', function (d, i) {
            return positionList[i].x + d.length * fontSize
          })
          .attr('y1', function (d, i) {
            return positionList[i].y - fontSize / 2 + 2
          })
          .attr('y2', function (d, i) {
            return positionList[i].y - fontSize / 2 + 2
          })
          .attr('stroke-width', fontSize + 4)
          .attr('stroke', '#969696')
          .attr('stroke-linecap', 'round')
        d3.select(el).selectAll('text')
          .data(majors)
          .enter()
          .append('text')
          .classed('major-item', true)
          .text(function (d) { return d })
          .attr('font-size', fontSize)
          .style('cursor', 'pointer')
          .attr('data-key', function (d) { return d })
          .attr('x', function (d, i) {
            return positionList[i].x
          })
          .attr('y', function (d, i) {
            return positionList[i].y
          })
          .attr('fill', '#fff')
      })

    function getNewPosition (pos, name) {
      var x1 = getXDis(pos.y)  // 右
      var x2 = -getXDis(pos.y) // 左
      var len = name.length * fontSize
      pos.x = pos.x < x2 ? x2 : pos.x
      if (pos.x + len > x1 + 10) {
        pos.y += (fontSize + 10)  // 两行间有 10px 间距
        pos.x = -getXDis(pos.y)
        getNewPosition(pos, name)
      }
    }

    function getXDis (y) {
      return Math.sqrt(majorRadius * majorRadius - y * y)
    }
  }

  Sunburst.prototype.renderProjectList = function (data, e) {
    var _this = this
    d3.selectAll('.project-list').remove()
    var projectList = d3.select('body')
      .append('ul')
      .classed('project-list', true)
      .style('left', e.offsetX + 20 + 'px')
    projectList.selectAll('li')
      .data(data)
      .enter()
      .append('li')
      .classed('project-item', true)
      .text(function (d) { return d })
    projectList.style('top', function () {
      var shiftY = e.offsetY + 20
      if (this.clientHeight + shiftY > _this.height) {
        shiftY = e.offsetY - this.clientHeight - 20
      }
      return shiftY + 'px'
    })
  }

  /**
   * 展示、隐藏领域
   * @param {String} key 需要展示的group名称, eg: education, finance
   * @param {Number} i 需要展示的group下标，用于确定要高亮的虚线
   */
  Sunburst.prototype.showGroup = function (key, i) {
    if (activeKey === key) {
      return
    }

    activeKey = key
    d3.selectAll('.majors')
      .attr('display', 'none')
      .style('opacity', 0)
    d3.select('.majors[data-key="' + key + '"]')
      .attr('display', 'block')
      .transition().duration(DURATION)
      .style('opacity', 1)
    d3.selectAll('.stroke-highlight').attr('stroke', BASIC_COLOR)
    d3.selectAll('.fill-highlight').attr('fill', BASIC_COLOR)
    d3.selectAll('[data-key="' + key + '"] path.fill-highlight')
      .attr('fill', HIGHLIGHT_COLOR)
    d3.selectAll('[data-key="' + key + '"] path.stroke-highlight')
      .attr('stroke', HIGHLIGHT_COLOR)

    d3.selectAll('.dash').each(function (d, ii, g) {
      if (i === 0) {
        d3.select(g[g.length - 1])
          .attr('stroke', HIGHLIGHT_COLOR)
      } else {
        d3.select(g[i - 1])
          .attr('stroke', HIGHLIGHT_COLOR)
      }
    })

    d3.selectAll('.logo')
      .attr('href', function (d) {
        return '/assets/' + d.data.key + '.svg'
      })
    d3.select('.logo[data-key="' + key + '"]')
      .attr('href', function (d) {
        return '/assets/' + d.data.key + '_highlight.svg'
      })
  }

  Sunburst.prototype.highlightMajor = function (key) {
    d3.selectAll('.majors line')
      .attr('stroke', '#969696')
    if (key) {
      d3.select('.majors line[data-key="' + key + '"]')
        .attr('stroke', '#60B5AA')
    }
    d3.select('.majors line[data-key="' + activeMajor + '"]')
      .attr('stroke', '#60B5AA')
  }

  function drawArc (innerR, outerR, startAngle, endAngle) {
    var arc = d3.arc()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .startAngle(startAngle)
      .endAngle(endAngle)

    return arc()
  }

  function drawLine (from, to) {
    return 'M' + from[0] + ',' + from[1] + 'L' + to[0] + ',' + to[1]
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
      .bindEvents()
  }
})()