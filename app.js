(function () {
  // JSON data
  var nodeData = {
    "name": "TOPICS",
    "children": [
      {
        "name": "教育",
        "id": "2",
        "key": "education",
        "majors": [
          {
            "name": "双语教育",
            "id": "973"
          },
          {
            "name": "发展心理学",
            "id": "972"
          },
          {
            "name": "对外英语教学(TESOL)",
            "id": "969"
          },
          {
            "name": "幼教",
            "id": "971"
          },
          {
            "name": "语言学",
            "id": "970"
          },
          {
            "name": "音乐教育",
            "id": "968"
          }
        ]
      },
      {
        "name": "金融",
        "id": "3",
        "key": "finance",
        "majors": [
          {
            "name": "金融工程/金融数学",
            "id": "975"
          },
          {
            "name": "金融硕士",
            "id": "977"
          },
          {
            "name": "金融管理",
            "id": "976"
          },
          {
            "name": "风险管理",
            "id": "974"
          }
        ]
      },
      {
        "name": "商科",
        "id": "7",
        "key": "business",
        "majors": [
          {
            "name": "人力资源管理",
            "id": "981"
          },
          {
            "name": "会计",
            "id": "978"
          },
          {
            "name": "供应链",
            "id": "984"
          },
          {
            "name": "创业",
            "id": "985"
          },
          {
            "name": "商业分析",
            "id": "979"
          },
          {
            "name": "市场营销",
            "id": "980"
          },
          {
            "name": "房地产",
            "id": "983"
          },
          {
            "name": "精算",
            "id": "986"
          },
          {
            "name": "酒店管理",
            "id": "982"
          }
        ]
      },
      {
        "name": "计算机大类",
        "id": "6",
        "key": "CS",
        "majors": [
          {
            "name": "人工智能(Artificial Intelligence)",
            "id": "988"
          },
          {
            "name": "人机交互(HCI)",
            "id": "990"
          },
          {
            "name": "信息系统(Information Systems)",
            "id": "989"
          },
          {
            "name": "机器人(Robotics)",
            "id": "991"
          },
          {
            "name": "计算机科学/计算机工程",
            "id": "987"
          }
        ]
      },
      {
        "name": "医学",
        "id": "17",
        "key": "medical",
        "majors": [
          {
            "name": "公共卫生",
            "id": "994"
          },
          {
            "name": "医学",
            "id": "993"
          },
          {
            "name": "生物制药/制剂",
            "id": "992"
          }
        ]
      },
      {
        "name": "工程",
        "id": "18",
        "key": "engineer",
        "majors": [
          {
            "name": "土木工程",
            "id": "1002"
          },
          {
            "name": "工业工程/运营研究(IE/OR)",
            "id": "996"
          },
          {
            "name": "技术管理(MOT)",
            "id": "995"
          },
          {
            "name": "机械工程",
            "id": "1003"
          },
          {
            "name": "材料工程/材料科学",
            "id": "999"
          },
          {
            "name": "环境工程",
            "id": "998"
          },
          {
            "name": "生物工程(BME)",
            "id": "997"
          },
          {
            "name": "电气工程",
            "id": "1001"
          },
          {
            "name": "航天工程",
            "id": "1000"
          }
        ]
      },
      {
        "name": "传媒",
        "id": "19",
        "key": "media",
        "majors": [
          {
            "name": "传媒管理",
            "id": "1009"
          },
          {
            "name": "公共关系(PR)",
            "id": "1006"
          },
          {
            "name": "公共管理/公共政策(MPA/MPP)",
            "id": "1005"
          },
          {
            "name": "媒体与数字媒体",
            "id": "1007"
          },
          {
            "name": "新闻学",
            "id": "1004"
          },
          {
            "name": "游戏设计",
            "id": "1008"
          }
        ]
      },
      {
        "name": "艺术",
        "id": "20",
        "key": "art",
        "majors": [
          {
            "name": "城市规划&城市设计",
            "id": "1016"
          },
          {
            "name": "平面设计",
            "id": "1015"
          },
          {
            "name": "建筑学",
            "id": "1011"
          },
          {
            "name": "戏剧与影视",
            "id": "1012"
          },
          {
            "name": "摄影",
            "id": "1013"
          },
          {
            "name": "景观设计",
            "id": "1010"
          },
          {
            "name": "服装设计",
            "id": "1014"
          },
          {
            "name": "艺术管理",
            "id": "1017"
          }
        ]
      },
      {
        "name": "自然科学",
        "id": "21",
        "key": "science",
        "majors": [
          {
            "name": "化学",
            "id": "1019"
          },
          {
            "name": "物理学",
            "id": "1022"
          },
          {
            "name": "生物学",
            "id": "1020"
          },
          {
            "name": "生物统计/生物信息",
            "id": "1018"
          },
          {
            "name": "神经学",
            "id": "1023"
          },
          {
            "name": "营养学",
            "id": "1021"
          }
        ]
      },
      {
        "name": "人文",
        "id": "22",
        "key": "humanity",
        "majors": [
          {
            "name": "东亚研究",
            "id": "1027"
          },
          {
            "name": "创意写作",
            "id": "1028"
          },
          {
            "name": "国际关系",
            "id": "1025"
          },
          {
            "name": "心理学",
            "id": "1026"
          },
          {
            "name": "经济学",
            "id": "1024"
          }
        ]
      },
      {
        "name": "法律",
        "id": "23",
        "key": "law",
        "majors": [
          {
            "name": "法律硕士(LLM)",
            "id": "1029"
          }
        ]
      },
      {
        "name": "农学",
        "id": "24",
        "key": "agriculture",
        "majors": [
          {
            "name": "农业/土地/农作物科学(Agri/Soil/Crop Sciences)",
            "id": "1030"
          }
        ]
      },
      {
        "name": "数学大类",
        "id": "25",
        "key": "math",
        "majors": [
          {
            "name": "应用数学",
            "id": "1031"
          },
          {
            "name": "数据科学(Data Science)",
            "id": "1034"
          },
          {
            "name": "理论数学",
            "id": "1032"
          },
          {
            "name": "统计",
            "id": "1033"
          }
        ]
      }
    ]
  };

  var svg = document.getElementById('chart')
  Sunburst({
    el: svg,                    // 必须
    data: nodeData,             // 必须
    width: window.innerWidth,   // 非必须，默认 500px
    height: window.innerHeight > 970 ? window.innerHeight : 970  // 非必须，默认 500px；这里设置最小高度为 970
  })
})()