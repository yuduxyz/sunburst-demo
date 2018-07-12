(function () {
  // JSON data
  var nodeData = {
    "name": "TOPICS",
    "children": [{
      "name": "教育",
      "key": "education",
      "majors": [{ "name": "音乐教育", "id": 12 }]
    }, {
      "name": "金融",
      "key": "finance",
      "majors": [{ "name": "金融工程/金融数学", "id": 12 }, { "name": "风险管理", "id": 12 }, { "name": "金融硕士", "id": 12 }, { "name": "金融管理", "id": 12 }]
    }, {
      "name": "商科",
      "key": "business",
      "majors": [{ "name": "人力资源管理", "id": 12 }, { "name": "商业分析", "id": 12 }, { "name": "酒店管理", "id": 12 }, { "name": "会计", "id": 12 }, { "name": "房地产", "id": 12 }, { "name": "创业", "id": 12 }, { "name": "市场营销", "id": 12 }, { "name": "供应链", "id": 12 }, { "name": "精算", "id": 12 }]
    }, {
      "name": "计算机大类",
      "key": "CS",
      "majors": [{ "name": "计算机科学/计算机工程", "id": 12 }, { "name": "人工智能", "id": 12 }, { "name": "信息系统", "id": 12 }, { "name": "人机交互", "id": 12 }, { "name": "机器人", "id": 12 }]
    }, {
      "name": "医学",
      "key": "medical",
      "majors": [{ "name": "生物制药/制剂", "id": 12 }, { "name": "医学", "id": 12 }, { "name": "公共卫生", "id": 12 }]
    }, {
      "name": "工程",
      "key": "engineer",
      "majors": [{ "name": "技术管理", "id": 12 }, { "name": "生物工程", "id": 12 }, { "name": "环境工程", "id": 12 }, { "name": "航天工程", "id": 12 }, { "name": "工业工程/运营研究", "id": 12 }, { "name": "材料工程/材料科学", "id": 12 }, { "name": "电气工程", "id": 12 }, { "name": "机械工程", "id": 12 }, { "name": "土木工程", "id": 12 }]
    }, {
      "name": "传媒",
      "key": "media",
      "majors": [{ "name": "新闻学", "id": 12 }, { "name": "公共管理/公共政策", "id": 12 }, { "name": "公共关系", "id": 12 }, { "name": "媒体与数字媒体", "id": 12 }, { "name": "游戏设计", "id": 12 }, { "name": "媒体管理", "id": 12 }]
    }, {
      "name": "艺术",
      "key": "art",
      "majors": [{ "name": "景观设计", "id": 12 }, { "name": "建筑学", "id": 12 }, { "name": "戏剧与影视", "id": 12 }, { "name": "城市规划&城市设计", "id": 12 }, { "name": "摄影", "id": 12 }, { "name": "服装设计", "id": 12 }, { "name": "平面设计", "id": 12 }, { "name": "艺术管理", "id": 12 }]
    }, {
      "name": "自然科学",
      "key": "science",
      "majors": [{ "name": "化学", "id": 12 }, { "name": "生物统计/生物信息", "id": 12 }, { "name": "生物学", "id": 12 }, { "name": "营养学", "id": 12 }, { "name": "物理学", "id": 12 }, { "name": "神经学", "id": 12 }]
    }, {
      "name": "人文",
      "key": "humanity",
      "majors": [{ "name": "经济学", "id": 12 }, { "name": "国际关系", "id": 12 }, { "name": "心理学", "id": 12 }, { "name": "东亚研究", "id": 12 }, { "name": "创意写作", "id": 12 }] }, { "name": "法律", "key": "law", "majors": [{ "name": "法律硕士", "id": 12 }]
    }, {
      "name": "农学",
      "key": "agriculture",
      "majors": [{ "name": "农业/土地/农作物科学", "id": 12 }] }, { "name": "数学大类", "key": "math", "majors": [{ "name": "应用数学", "id": 12 }, { "name": "理论数学", "id": 12 }, { "name": "统计", "id": 12 }, { "name": "数据科学", "id": 12 }]
    }]
  };

  var svg = document.getElementById('chart')
  Sunburst({
    el: svg,                    // 必须
    data: nodeData,             // 必须
    width: window.innerWidth,   // 非必须，默认 500px
    height: window.innerHeight > 970 ? window.innerHeight : 970  // 非必须，默认 500px；这里设置最小高度为 970
  })
})()