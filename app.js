(function () {
  // JSON data
  var nodeData = {
    "name": "TOPICS",
    "children": [{
      "name": "教育",
      "key": "education",
      "children": []
    }, {
      "name": "金融",
      "key": "finance",
      "children": []
    }, {
      "name": "商科",
      "key": "business",
      "children": []
    }, {
      "name": "计算机大类",
      "key": "CS",
      "children": []
    }, {
      "name": "医学",
      "key": "medical",
      "children": []
    }, {
      "name": "工程",
      "key": "engineer",
      "children": []
    }, {
      "name": "传媒",
      "key": "media",
      "children": []
    }, {
      "name": "艺术",
      "key": "art",
      "children": []
    }, {
      "name": "自然科学",
      "key": "science",
      "children": []
    }, {
      "name": "人文",
      "key": "humanity",
      "children": []
    }, {
      "name": "法律",
      "key": "law",
      "children": []
    }, {
      "name": "农学",
      "key": "agriculture",
      "children": []
    }, {
      "name": "数学大类",
      "key": "math",
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