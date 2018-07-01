(function () {
  // JSON data
  var nodeData = {
    "name": "TOPICS",
    "children": [{
      "name": "教育",
      "children": []
    }, {
      "name": "金融",
      "children": []
    }, {
      "name": "商科",
      "children": []
    }, {
      "name": "计算机大类",
      "children": []
    }, {
      "name": "医学",
      "children": []
    }, {
      "name": "工程",
      "children": []
    }, {
      "name": "传媒",
      "children": []
    }, {
      "name": "艺术",
      "children": []
    }, {
      "name": "自然科学",
      "children": []
    }, {
      "name": "人文",
      "children": []
    }, {
      "name": "法律",
      "children": []
    }, {
      "name": "农学",
      "children": []
    }, {
      "name": "数学大类",
      "children": []
    }]
  };

  var svg = document.getElementById('chart')
  Sunburst({
    el: svg,                    // 必须
    data: nodeData,             // 必须
    width: window.innerWidth,   // 非必须，默认 500px
    height: window.innerHeight  // 非必须，默认 500px
  })
})()