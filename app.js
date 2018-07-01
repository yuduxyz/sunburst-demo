(function () {
  // JSON data
  var nodeData = {
    "name": "TOPICS", "children": [{
      "name": "Topic A",
      "children": [{ "name": "Sub A1", "size": 4 }, { "name": "Sub A2", "size": 4 }]
    }, {
      "name": "Topic B",
      "children": [{ "name": "Sub B1", "size": 3 }, { "name": "Sub B2", "size": 3 }, {
        "name": "Sub B3", "size": 3
      }]
    }, {
      "name": "Topic C",
      "children": [{ "name": "Sub A1", "size": 4 }, { "name": "Sub A2", "size": 4 }]
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