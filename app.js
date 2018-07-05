(function () {
  // JSON data
  var nodeData = {
    "name": "TOPICS",
    "children": [{
      "name": "教育",
      "key": "education",
      "majors": ['音乐教育']
    }, {
      "name": "金融",
      "key": "finance",
      "majors": ['风险管理', '金融工程/金融数学', '金融硕士', '金融管理']
    }, {
      "name": "商科",
      "key": "business",
      "majors": ['会计', '商业分析', '市场营销', '人力资源管理', '酒店管理', '房地产', '供应链', '创业', '精算']
    }, {
      "name": "计算机大类",
      "key": "CS",
      "majors": ['计算机科学/计算机工程', '人工智能', '信息系统(Information Systems)', '人机交互(HCI)', '机器人(Robotics)']
    }, {
      "name": "医学",
      "key": "medical",
      "majors": ['生物制药/制剂', '医学', '公共卫生']
    }, {
      "name": "工程",
      "key": "engineer",
      "majors": ['技术管理(MOT)', '工业工程/运营研究(IE/OR)', '生物工程(BME)', '环境工程', '材料工程/材料科学', '航天空城', '电气工程', '机械工程', '土木工程']
    }, {
      "name": "传媒",
      "key": "media",
      "majors": ['新闻学', '公共管理/公共政策(MPA/MPP)', '公共关系(PR)', '媒体与数字媒体', '游戏设计', '媒体管理']
    }, {
      "name": "艺术",
      "key": "art",
      "majors": ['景观设计', '建筑学', '戏剧与影视', '摄影', '服装设计', '平面设计', '城市规划&城市设计', '艺术管理']
    }, {
      "name": "自然科学",
      "key": "science",
      "majors": ['生物统计/生物信息', '化学', '生物学', '营养学', '物理学', '神经学']
    }, {
      "name": "人文",
      "key": "humanity",
      "majors": ['经济学', '国际关系', '心理学', '东亚研究', '创意写作']
    }, {
      "name": "法律",
      "key": "law",
      "majors": ['法律硕士(LLM)']
    }, {
      "name": "农学",
      "key": "agriculture",
      "majors": ['农业/土地/农作物科学(Agri/Soil/Crop Sciences)']
    }, {
      "name": "数学大类",
      "key": "math",
      "majors": ['应用数学', '理论数学', '统计', '数据科学(Data Science)']
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