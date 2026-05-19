const ranks = [
  {
    name: "讲师",
    icon: "讲",
    subtitle: "青椒起步",
    next: "副教授",
    goals: { papers: 4, funding: 80, prestige: 20, network: 12, students: 25, ethics: 20, riskMax: 82 }
  },
  {
    name: "副教授",
    icon: "副",
    subtitle: "帽子预备役",
    next: "教授",
    goals: { papers: 10, funding: 180, prestige: 45, network: 28, students: 25, ethics: 18, riskMax: 82 }
  },
  {
    name: "教授",
    icon: "教",
    subtitle: "学术山腰",
    next: "四小青",
    goals: { papers: 18, funding: 320, prestige: 70, network: 50, students: 30, ethics: 22, riskMax: 76 }
  },
  {
    name: "四小青",
    icon: "小",
    subtitle: "青年帽子",
    next: "三大青",
    goals: { papers: 30, funding: 520, prestige: 100, network: 76, students: 35, ethics: 25, riskMax: 72 }
  },
  {
    name: "三大青",
    icon: "大",
    subtitle: "大PI之路",
    next: "院士",
    goals: { papers: 48, funding: 820, prestige: 140, network: 110, students: 42, ethics: 28, riskMax: 68 }
  },
  {
    name: "院士",
    icon: "院",
    subtitle: "学术天花板",
    next: null,
    goals: {}
  }
];

const metricDefs = [
  { key: "papers", label: "成果", unit: "篇", max: 60, className: "paper" },
  { key: "funding", label: "经费", unit: "万", max: 1000, className: "funding" },
  { key: "prestige", label: "声望", unit: "", max: 180, className: "prestige" },
  { key: "network", label: "人脉", unit: "", max: 140, className: "network" },
  { key: "students", label: "学生状态", unit: "", max: 100, className: "students" },
  { key: "ethics", label: "师德", unit: "", max: 100, className: "ethics" },
  { key: "risk", label: "风险", unit: "", max: 100, className: "risk", inverse: true },
  { key: "stamina", label: "精力", unit: "", max: 100, className: "stamina" }
];

const schools = {
  "双非突围": {
    desc: "资源少，叙事空间大",
    stats: { papers: 0, funding: 12, prestige: 2, network: 2, students: 66, ethics: 76, risk: 8, stamina: 86 },
    badge: "双非突围者"
  },
  "省属强校": {
    desc: "平台一般，卷度稳定",
    stats: { papers: 1, funding: 24, prestige: 5, network: 5, students: 70, ethics: 74, risk: 10, stamina: 82 },
    badge: "地方重点选手"
  },
  "985平台": {
    desc: "资源丰厚，考核也丰厚",
    stats: { papers: 2, funding: 45, prestige: 9, network: 8, students: 72, ethics: 72, risk: 13, stamina: 78 },
    badge: "平台红利持有者"
  }
};

const fields = {
  "理工实验室": {
    desc: "仪器、耗材、夜半数据",
    stats: { papers: 1, funding: 15, prestige: 0, network: 0, students: -2, ethics: 0, risk: 2, stamina: -3 },
    badge: "仪器守夜人"
  },
  "人文社科": {
    desc: "田野、文本、选题拉扯",
    stats: { papers: 0, funding: -5, prestige: 5, network: 2, students: 2, ethics: 2, risk: -1, stamina: 0 },
    badge: "概念打磨师"
  },
  "医工交叉": {
    desc: "伦理审查和临床需求齐飞",
    stats: { papers: 1, funding: 20, prestige: 3, network: 2, students: -3, ethics: 0, risk: 5, stamina: -4 },
    badge: "交叉口漂移者"
  }
};

const temperaments = {
  "良心导师": {
    desc: "慢一点，但学生更愿意跟你走远路",
    stats: { papers: 0, funding: 0, prestige: 2, network: 0, students: 12, ethics: 12, risk: -4, stamina: 2 },
    badge: "办公室常备纸巾"
  },
  "卷王PI": {
    desc: "成果来得快，代价也来得快",
    stats: { papers: 3, funding: 8, prestige: 0, network: 0, students: -12, ethics: -8, risk: 10, stamina: -6 },
    badge: "凌晨三点在线"
  },
  "社交达人": {
    desc: "会开会，也会在会后开会",
    stats: { papers: 0, funding: 10, prestige: 4, network: 14, students: 0, ethics: -2, risk: 3, stamina: -2 },
    badge: "茶歇区传说"
  }
};

const normalActions = [
  {
    title: "冲刺顶刊",
    text: "把选题、数据和措辞都压到极限，赌一把审稿人今天心情不错。",
    tag: "6个月",
    style: "primary",
    months: 6,
    effects: { papers: [2, 5], prestige: [3, 8], stamina: [-16, -9], risk: [3, 8], students: [-6, 1] },
    badges: [{ when: s => s.stats.papers >= 20, name: "顶刊流水线" }]
  },
  {
    title: "打磨项目书",
    text: "用三种字体和五层逻辑框架证明：这个坑，非你来填不可。",
    tag: "4个月",
    months: 4,
    effects: { funding: [35, 95], network: [2, 6], prestige: [1, 4], stamina: [-12, -6], risk: [1, 4] },
    badges: [{ when: s => s.stats.funding >= 500, name: "经费捕手" }]
  },
  {
    title: "参加学术饭局",
    text: "圆桌上没有公式，但每一句“以后多合作”都可能变成评审会上的点头。",
    tag: "3个月",
    months: 3,
    effects: { network: [7, 14], funding: [8, 28], prestige: [2, 5], stamina: [-9, -3], ethics: [-3, 1], risk: [1, 5] },
    badges: [{ when: s => s.stats.network >= 80, name: "茶歇区传说" }]
  },
  {
    title: "认真指导学生",
    text: "逐字改论文、逐页看PPT，学生活过来了，你的周末不见了。",
    tag: "5个月",
    style: "safe",
    months: 5,
    effects: { students: [10, 18], ethics: [5, 10], prestige: [2, 6], papers: [0, 2], stamina: [-13, -7], risk: [-7, -2] },
    badges: [{ when: s => s.stats.students >= 90, name: "组会心理委员" }]
  },
  {
    title: "压榨硕博",
    text: "把DDL拆成更多DDL。短期产出漂亮，长期账单会自己找上门。",
    tag: "3个月",
    style: "warning",
    months: 3,
    effects: { papers: [3, 6], funding: [5, 25], prestige: [-2, 3], students: [-24, -14], ethics: [-16, -9], risk: [12, 22], stamina: [-6, 0] },
    badges: [{ when: s => s.flags.exploitCount >= 3, name: "工位灯不熄" }]
  },
  {
    title: "行政周旋",
    text: "在会议纪要、专家推荐和学院群接龙之间寻找一个能升职的角度。",
    tag: "4个月",
    months: 4,
    effects: { network: [5, 11], prestige: [2, 5], funding: [8, 24], papers: [-1, 1], stamina: [-10, -5], risk: [0, 4] },
    badges: [{ when: s => s.stats.network >= 120, name: "会议纪要诗人" }]
  },
  {
    title: "招兵买马",
    text: "扩招、联合培养、拉实习生。组里热闹了，账上也薄了。",
    tag: "4个月",
    months: 4,
    effects: { students: [8, 16], papers: [0, 2], funding: [-45, -18], stamina: [-8, -4], prestige: [1, 3], risk: [0, 4] },
    badges: [{ when: s => s.stats.students >= 80 && s.stats.funding < 80, name: "大组穷养派" }]
  },
  {
    title: "躺平恢复",
    text: "关掉邮箱半天，去校医院复查，然后假装没看到新的材料通知。",
    tag: "3个月",
    style: "safe",
    months: 3,
    effects: { stamina: [18, 28], students: [2, 7], risk: [-12, -5], ethics: [1, 4], papers: [-1, 0] },
    badges: [{ when: s => s.stats.stamina >= 95, name: "准时下班异端" }]
  }
];

const eventDeck = [
  {
    title: "学生在组会后发来长信",
    body: "他说自己不是不努力，只是已经连续三周梦见审稿意见追着跑。",
    choices: [
      { title: "放半天假并单聊", text: "学生状态回暖，进度慢一点但队伍还在。", effects: { students: [14, 24], ethics: [8, 14], risk: [-8, -3], stamina: [-5, -1], papers: [-1, 0] }, log: "你把组会改成了单聊，实验室短暂恢复了人形。" },
      { title: "加一轮夜间实验", text: "论文快了，火药味也浓了。", effects: { papers: [2, 4], students: [-22, -12], ethics: [-13, -7], risk: [12, 20], stamina: [-8, -2] }, flag: "exploitCount", log: "凌晨的实验数据很好看，群消息的语气不太好看。" },
      { title: "匿名吐槽箱上线", text: "有人真吐槽了，有人趁机交了表情包。", effects: { students: [5, 13], ethics: [3, 8], prestige: [0, 2], risk: [-4, 1], stamina: [-4, 0] }, badge: "吐槽箱管理员", log: "吐槽箱第一条是：建议导师先睡觉。" }
    ]
  },
  {
    title: "横向项目老板追加需求",
    body: "对方说“很简单”，一般这三个字后面会跟着六个月需求变更。",
    choices: [
      { title: "接，换经费", text: "账上好看，组里开始怀疑人生。", effects: { funding: [70, 130], network: [4, 8], students: [-10, -4], stamina: [-12, -5], risk: [5, 12] }, log: "项目群多了47条未读，你多了一笔经费。" },
      { title: "把边界写清楚", text: "少赚一点，少炸一点。", effects: { funding: [25, 55], prestige: [2, 5], ethics: [4, 8], risk: [-3, 2], stamina: [-5, -1] }, log: "你第一次把需求文档写得像免责声明。" },
      { title: "甩给学生练手", text: "进账很快，背后骂声也很快。", effects: { funding: [50, 95], papers: [1, 3], students: [-18, -8], ethics: [-12, -6], risk: [10, 18] }, flag: "exploitCount", log: "学生学会了甲方沟通，也学会了沉默。" }
    ]
  },
  {
    title: "匿名评审：创新性不足",
    body: "你盯着这六个字，感觉它们像一面无边无际的墙。",
    choices: [
      { title: "补理论框架", text: "慢，但能把坑填实。", effects: { prestige: [6, 12], papers: [1, 2], ethics: [2, 5], stamina: [-12, -6], risk: [-2, 2] }, log: "你把“直觉”改造成了“机制解释”。" },
      { title: "引用潜在评委", text: "学术共同体突然变得共同了一点。", effects: { network: [5, 10], prestige: [1, 5], ethics: [-4, 0], risk: [3, 8], stamina: [-4, 0] }, log: "参考文献多了几位熟悉的名字。" },
      { title: "转投快刊", text: "成果数字变好，声望曲线略抖。", effects: { papers: [2, 4], prestige: [-5, 0], risk: [8, 16], stamina: [-5, 0] }, log: "系统显示接收，同行显示沉默。" }
    ]
  },
  {
    title: "学院让你负责本科教学评估",
    body: "通知写着“请积极配合”，这句话通常没有拒绝按钮。",
    choices: [
      { title: "认真做完", text: "行政认可上升，科研进度被偷走。", effects: { prestige: [4, 8], network: [4, 8], students: [1, 5], papers: [-2, 0], stamina: [-12, -5], risk: [-2, 1] }, badge: "评估材料修士", log: "你在材料堆里看见了另一个自己。" },
      { title: "让助教扛", text: "省时间，伤口碑。", effects: { papers: [1, 3], students: [-12, -6], ethics: [-10, -5], risk: [7, 14], stamina: [-3, 2] }, flag: "exploitCount", log: "助教说“收到”，但没有发微笑表情。" },
      { title: "换资源支持", text: "会哭的老师有设备。", effects: { funding: [18, 44], network: [3, 7], prestige: [1, 5], stamina: [-8, -3], risk: [0, 4] }, log: "你把评估任务折算成了一台服务器。" }
    ]
  },
  {
    title: "组内博士拿到顶会",
    body: "他在朋友圈发了录用截图，评论区比你的课题组群更热闹。",
    choices: [
      { title: "让他独立发光", text: "学生更信你，同行也记住了这个组。", effects: { students: [10, 18], ethics: [8, 14], prestige: [5, 10], papers: [1, 2], network: [1, 4] }, badge: "桃李投资人", log: "你把聚光灯推给学生，自己反而更亮了一点。" },
      { title: "并入大课题叙事", text: "履历更整齐，学生心里有点堵。", effects: { papers: [2, 4], funding: [10, 35], prestige: [2, 7], students: [-12, -5], ethics: [-8, -3], risk: [4, 10] }, log: "成果归档漂亮，空气略微安静。" },
      { title: "开庆功组会", text: "士气涨了，经费没了。", effects: { students: [8, 16], prestige: [3, 7], funding: [-18, -6], ethics: [3, 7], stamina: [-4, 0] }, log: "蛋糕上写着 Accept，大家都拍了照。" }
    ]
  },
  {
    title: "经费审计抽查",
    body: "财务老师的电话很温柔，内容很锋利。",
    choices: [
      { title: "规范补材料", text: "累，但稳。", effects: { risk: [-18, -8], ethics: [3, 7], stamina: [-14, -7], papers: [-1, 0] }, log: "你终于知道每一张发票背后的宇宙。" },
      { title: "找熟人打招呼", text: "眼前过关，风险换了个抽屉。", effects: { network: [-10, -4], risk: [-10, -2], ethics: [-8, -3], prestige: [-2, 1], stamina: [-6, -1] }, log: "事情压下去了，你的通讯录少了一点余地。" },
      { title: "让秘书背锅", text: "短期风险下降，长期人格破产。", effects: { risk: [-12, -5], ethics: [-22, -14], students: [-8, -3], prestige: [-7, -2] }, log: "办公室安静得像一份未签字的说明。" }
    ]
  },
  {
    title: "媒体想采访你的成果",
    body: "宣传部希望标题响一点，同行希望你低调一点。",
    choices: [
      { title: "如实讲清边界", text: "不炸裂，但耐看。", effects: { prestige: [5, 10], ethics: [5, 9], risk: [-7, -2], network: [1, 4] }, log: "报道不夸张，却有人认真读完了。" },
      { title: "包装成颠覆突破", text: "声量起飞，风险也起飞。", effects: { prestige: [10, 20], funding: [20, 60], risk: [14, 25], ethics: [-12, -6], network: [3, 7] }, log: "标题很响，评论区也很响。" },
      { title: "推学生出镜", text: "学生开心，导师也显得有格局。", effects: { students: [8, 15], ethics: [4, 9], prestige: [3, 8], stamina: [-3, 0], risk: [-3, 2] }, log: "学生第一次在镜头前说了完整的人话。" }
    ]
  },
  {
    title: "两位学生想转组",
    body: "他们说不是针对你，只是想找一个能睡觉的方向。",
    choices: [
      { title: "体面放人", text: "损失人手，留下口碑。", effects: { students: [-8, -2], ethics: [10, 16], risk: [-12, -5], prestige: [1, 5], papers: [-1, 0] }, log: "你签了字，实验室的门没有被摔上。" },
      { title: "用毕业卡住", text: "人暂时留下，心已经走远。", effects: { students: [-22, -12], ethics: [-18, -10], risk: [16, 28], papers: [1, 3] }, flag: "exploitCount", log: "名单还在，士气不在。" },
      { title: "调整课题和节奏", text: "花时间修复系统。", effects: { students: [8, 18], ethics: [5, 10], risk: [-8, -2], stamina: [-10, -4], papers: [-1, 1] }, log: "你承认安排有问题，这比想象中难。" }
    ]
  },
  {
    title: "老同学创业邀请",
    body: "他说高校成果转化风口到了，还说你只需要挂个技术负责人。",
    choices: [
      { title: "谨慎合作", text: "慢慢谈合同，慢慢拿收益。", effects: { funding: [35, 85], network: [4, 10], prestige: [2, 6], risk: [2, 7], stamina: [-7, -2] }, log: "你把“兄弟价”改成了“法务价”。" },
      { title: "全力押注", text: "钱和风险都来了。", effects: { funding: [90, 170], network: [8, 16], prestige: [5, 12], risk: [14, 28], stamina: [-14, -6], papers: [-1, 1] }, badge: "成果转化赌徒", log: "公司Logo还没定，你已经有了三份协议。" },
      { title: "专注学术", text: "错过一笔钱，守住一段节奏。", effects: { papers: [1, 3], ethics: [3, 7], risk: [-5, -1], funding: [-10, 0], stamina: [0, 5] }, log: "你关掉商业计划书，打开了审稿意见。" }
    ]
  },
  {
    title: "国际会议邀请你做报告",
    body: "机票很贵，时差很硬，但PPT最后一页写着合作机会。",
    choices: [
      { title: "亲自去讲", text: "声望和人脉都动了，身体也动不了了。", effects: { prestige: [8, 16], network: [6, 14], funding: [5, 25], stamina: [-16, -8], papers: [0, 2] }, badge: "机场改稿人", log: "你在登机口改完了最后一页PPT。" },
      { title: "派博士后上场", text: "团队被看见，你少掉一半时差。", effects: { students: [5, 12], prestige: [4, 10], network: [3, 8], ethics: [3, 7], stamina: [-6, -1] }, log: "博士后讲得很好，你在台下学会了放手。" },
      { title: "线上糊弄", text: "成本低，效果也低。", effects: { network: [-2, 3], prestige: [-2, 3], stamina: [2, 8], risk: [0, 5] }, log: "网络卡顿替你挡掉了一个尖锐问题。" }
    ]
  }
];

const promotionStrategies = [
  {
    title: "讲清科学故事",
    text: "把零散成果串成一条可信的学术路线。",
    style: "safe",
    score: s => s.stats.papers * 1.6 + s.stats.prestige * 1.5 + s.stats.ethics * .45 + s.stats.students * .25 - s.stats.risk * .8,
    effects: { prestige: [4, 9], ethics: [2, 6], stamina: [-8, -4] },
    failEffects: { prestige: [-4, -1], stamina: [-8, -3] }
  },
  {
    title: "拜访关键委员",
    text: "有时候材料在系统里，答案在会场外。",
    score: s => s.stats.network * 1.8 + s.stats.funding * .08 + s.stats.prestige * .6 - s.stats.risk * .9,
    effects: { network: [4, 8], risk: [3, 8], ethics: [-4, 0], stamina: [-6, -2] },
    failEffects: { network: [-8, -3], risk: [6, 14], ethics: [-6, -2] }
  },
  {
    title: "堆满KPI清单",
    text: "让数字自己在评审桌上走路。",
    score: s => s.stats.papers * 2 + s.stats.funding * .12 + s.stats.prestige * .75 - s.stats.risk,
    effects: { papers: [1, 3], funding: [10, 28], stamina: [-8, -3], risk: [2, 7] },
    failEffects: { prestige: [-6, -2], risk: [4, 12], stamina: [-8, -3] }
  }
];

const names = ["林知远", "陈半山", "许问渠", "赵不眠", "周砚秋", "顾明仪", "沈向北", "何见微"];

let state = createBlankState();

const els = {
  stageTrack: document.getElementById("stageTrack"),
  mentorName: document.getElementById("mentorName"),
  mentorMeta: document.getElementById("mentorMeta"),
  mentorAvatar: document.getElementById("mentorAvatar"),
  ageText: document.getElementById("ageText"),
  timeText: document.getElementById("timeText"),
  rankText: document.getElementById("rankText"),
  seasonText: document.getElementById("seasonText"),
  mainTitle: document.getElementById("mainTitle"),
  metricsGrid: document.getElementById("metricsGrid"),
  sceneKicker: document.getElementById("sceneKicker"),
  sceneTitle: document.getElementById("sceneTitle"),
  sceneBody: document.getElementById("sceneBody"),
  choiceList: document.getElementById("choiceList"),
  goalList: document.getElementById("goalList"),
  badgeList: document.getElementById("badgeList"),
  badgeCount: document.getElementById("badgeCount"),
  logList: document.getElementById("logList"),
  promotionButton: document.getElementById("promotionButton"),
  saveButton: document.getElementById("saveButton"),
  loadButton: document.getElementById("loadButton"),
  restartButton: document.getElementById("restartButton")
};

function createBlankState() {
  return {
    started: false,
    mode: "setup",
    mentor: { name: "", school: "", field: "", temperament: "" },
    rankIndex: 0,
    months: 0,
    age: 31,
    stats: { papers: 0, funding: 0, prestige: 0, network: 0, students: 0, ethics: 0, risk: 0, stamina: 0 },
    flags: { exploitCount: 0, promotionFails: 0, finalAttempts: 0 },
    badges: [],
    log: [],
    pendingEvent: null,
    lastSummary: "",
    gameOver: null
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function roll(range) {
  if (!Array.isArray(range)) return range;
  const [min, max] = range;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function addStats(effects = {}) {
  Object.entries(effects).forEach(([key, value]) => {
    if (!(key in state.stats)) return;
    state.stats[key] += roll(value);
  });

  state.stats.papers = clamp(Math.round(state.stats.papers), 0, 999);
  state.stats.funding = Math.round(state.stats.funding);
  state.stats.prestige = clamp(Math.round(state.stats.prestige), 0, 999);
  state.stats.network = clamp(Math.round(state.stats.network), 0, 999);
  state.stats.students = clamp(Math.round(state.stats.students), 0, 100);
  state.stats.ethics = clamp(Math.round(state.stats.ethics), 0, 100);
  state.stats.risk = clamp(Math.round(state.stats.risk), 0, 100);
  state.stats.stamina = clamp(Math.round(state.stats.stamina), 0, 100);
}

function addMonths(months) {
  state.months += months;
  state.age = 31 + Math.floor(state.months / 12);
}

function addLog(text) {
  const date = formatTime();
  state.log.unshift(`${date}：${text}`);
  state.log = state.log.slice(0, 24);
}

function addBadge(name) {
  if (!name || state.badges.includes(name)) return;
  state.badges.push(name);
  addLog(`获得履历标签「${name}」。`);
}

function formatTime() {
  const years = Math.floor(state.months / 12);
  const months = state.months % 12;
  return `${years}年${months}月`;
}

function getSeasonText() {
  if (!state.started) return "建档中";
  return `第${Math.floor(state.months / 6) + 1}学期`;
}

function goalEntries(rank = ranks[state.rankIndex]) {
  const goals = rank.goals || {};
  return [
    { key: "papers", label: "成果", value: state.stats.papers, target: goals.papers, suffix: "篇" },
    { key: "funding", label: "经费", value: state.stats.funding, target: goals.funding, suffix: "万" },
    { key: "prestige", label: "声望", value: state.stats.prestige, target: goals.prestige, suffix: "" },
    { key: "network", label: "人脉", value: state.stats.network, target: goals.network, suffix: "" },
    { key: "students", label: "学生状态", value: state.stats.students, target: goals.students, suffix: "" },
    { key: "ethics", label: "师德", value: state.stats.ethics, target: goals.ethics, suffix: "" },
    { key: "risk", label: "风险上限", value: state.stats.risk, target: goals.riskMax, suffix: "", maxGoal: true }
  ].filter(item => item.target !== undefined);
}

function requirementsMet() {
  if (state.rankIndex >= ranks.length - 1) return true;
  return goalEntries().every(item => item.maxGoal ? item.value <= item.target : item.value >= item.target);
}

function requirementRatio() {
  const entries = goalEntries();
  if (!entries.length) return 1;
  const ratios = entries.map(item => {
    if (item.maxGoal) return item.value <= item.target ? 1 : clamp(1 - (item.value - item.target) / 45, 0, 1);
    return clamp(item.value / item.target, 0, 1);
  });
  return ratios.reduce((sum, item) => sum + item, 0) / ratios.length;
}

function applySetup() {
  const school = document.querySelector("input[name='school']:checked")?.value || "省属强校";
  const field = document.querySelector("input[name='field']:checked")?.value || "理工实验室";
  const temperament = document.querySelector("input[name='temperament']:checked")?.value || "良心导师";
  const name = document.getElementById("nameInput")?.value.trim() || sample(names);

  state = createBlankState();
  state.started = true;
  state.mode = "normal";
  state.mentor = { name, school, field, temperament };
  state.stats = { papers: 0, funding: 20, prestige: 3, network: 3, students: 70, ethics: 72, risk: 10, stamina: 82 };
  addStats(schools[school].stats);
  addStats(fields[field].stats);
  addStats(temperaments[temperament].stats);
  [schools[school].badge, fields[field].badge, temperaments[temperament].badge].forEach(addBadge);
  addLog(`${name}入职${school}，方向是${field}，人格倾向：${temperament}。`);
  renderNormalScene("你的导师生涯开始了", "办公室门牌刚贴上，第一批学生已经在门外探头。");
  render();
}

function applyAction(action) {
  if (state.gameOver || state.mode !== "normal") return;
  addMonths(action.months);
  if (action.title === "压榨硕博") state.flags.exploitCount += 1;
  addStats(action.effects);
  if (action.badges) {
    action.badges.forEach(badge => {
      if (badge.when(state)) addBadge(badge.name);
    });
  }
  addLog(`选择「${action.title}」。${action.text}`);

  if (checkGameOver()) {
    render();
    return;
  }

  if (Math.random() < eventChance()) {
    showRandomEvent();
  } else {
    renderNormalScene(
      "学期继续推进",
      summarizeAction(action)
    );
  }
  render();
}

function eventChance() {
  let chance = .38 + state.stats.risk / 260;
  if (state.stats.students < 35) chance += .12;
  if (state.stats.stamina < 25) chance += .1;
  return clamp(chance, .32, .72);
}

function summarizeAction(action) {
  const lines = [
    "学院邮箱继续冒烟，课题组群继续闪烁。",
    "你感觉自己离下一顶帽子近了一点，也离睡眠远了一点。",
    "材料系统又改版了，但至少今天的选择已经落地。",
    "走廊上的公告换了一轮，你的履历也添了一笔。"
  ];
  if (action.title === "压榨硕博") return "短期产出确实上来了。只是实验室的空气，比昨天更像一份待处理舆情。";
  if (action.title === "认真指导学生") return "学生带着改完的稿子离开，你突然觉得学术共同体也可以有点人味。";
  return sample(lines);
}

function showRandomEvent() {
  const event = sample(eventDeck);
  state.mode = "event";
  state.pendingEvent = event;
  els.sceneKicker.textContent = "突发事件";
  els.sceneTitle.textContent = event.title;
  els.sceneBody.textContent = event.body;
  renderChoices(event.choices.map(choice => ({
    ...choice,
    onClick: () => resolveEvent(choice)
  })));
}

function resolveEvent(choice) {
  if (!state.pendingEvent) return;
  if (choice.flag) state.flags[choice.flag] = (state.flags[choice.flag] || 0) + 1;
  addStats(choice.effects);
  if (choice.badge) addBadge(choice.badge);
  addLog(choice.log || `处理事件「${state.pendingEvent.title}」：${choice.title}。`);
  state.pendingEvent = null;
  state.mode = "normal";

  if (checkGameOver()) {
    render();
    return;
  }
  renderNormalScene("事件处理完毕", "新的邮件已经到达，但你至少暂时从这次风波里走出来了。");
  render();
}

function startPromotion() {
  if (!state.started || state.gameOver || state.mode !== "normal") return;
  const currentRank = ranks[state.rankIndex];
  if (!currentRank.next) {
    winGame();
    return;
  }

  const ratio = requirementRatio();
  state.mode = "promotion";
  els.sceneKicker.textContent = "晋升评审";
  els.sceneTitle.textContent = `申请晋升：${currentRank.name} → ${currentRank.next}`;
  if (requirementsMet()) {
    els.sceneBody.textContent = "材料刚好够硬。现在需要选择答辩策略，让评审相信你不是只会填表。";
  } else if (ratio > .82) {
    els.sceneBody.textContent = "材料还有短板，但也不是完全不能冲。硬上会有风险，策略选得好也可能惊险过线。";
  } else {
    els.sceneBody.textContent = "材料明显不够。你可以硬闯评审会，但失败会留下痕迹。";
  }

  renderChoices(promotionStrategies.map(strategy => ({
    ...strategy,
    onClick: () => resolvePromotion(strategy)
  })).concat({
    title: "撤回申请",
    text: "承认材料还需要养一养，先把评审老师从名单里放出来。",
    style: "safe",
    onClick: () => {
      state.mode = "normal";
      renderNormalScene("申请已撤回", "你把材料袋放回抽屉，决定再给履历一点生长时间。");
      render();
    }
  }));
}

function resolvePromotion(strategy) {
  const currentRank = ranks[state.rankIndex];
  if (!currentRank.next) return;

  addMonths(currentRank.next === "院士" ? 12 : 6);
  addStats(strategy.effects);

  const base = requirementRatio() * 64;
  const score = strategy.score(state) / (state.rankIndex < 2 ? 10 : state.rankIndex < 4 ? 15 : 20);
  const riskPenalty = state.stats.risk > currentRank.goals.riskMax ? (state.stats.risk - currentRank.goals.riskMax) * .8 : 0;
  const failPenalty = state.flags.promotionFails * 2.5;
  const chance = clamp(Math.round(base + score - riskPenalty - failPenalty), 12, 94);
  const passed = Math.random() * 100 < chance && (requirementsMet() || Math.random() < requirementRatio() - .35);

  if (passed) {
    state.rankIndex += 1;
    state.flags.promotionFails = 0;
    const newRank = ranks[state.rankIndex];
    addBadge(`${newRank.name}上岸`);
    addLog(`评审通过，晋升为${newRank.name}。策略：${strategy.title}，通过率约${chance}%。`);

    if (newRank.name === "院士") {
      winGame();
      return;
    }
    state.mode = "normal";
    renderNormalScene("晋升成功", `新的门牌写着「${newRank.name}」。它更亮，也更重。`);
  } else {
    state.flags.promotionFails += 1;
    addStats(strategy.failEffects);
    addLog(`晋升失败。策略：${strategy.title}，通过率约${chance}%。`);
    if (currentRank.next === "院士") state.flags.finalAttempts += 1;

    if (state.flags.finalAttempts >= 3) {
      endGame("院士三连折戟", "你连续三次冲击院士未果。故事没有塌，但天花板暂时没有打开。");
      render();
      return;
    }
    state.mode = "normal";
    renderNormalScene("晋升失败", "评审意见写得很委婉，意思很明确：再攒攒。");
  }

  checkGameOver();
  render();
}

function checkGameOver() {
  if (state.rankIndex >= ranks.length - 1) return false;
  if (state.stats.students <= 0) return endGame("全组润走", "学生状态归零，实验室只剩服务器和未读邮件。");
  if (state.stats.ethics <= 0) return endGame("师德崩盘", "你赢过很多指标，但输掉了最不该输的底线。");
  if (state.stats.risk >= 100) return endGame("学术风波热搜", "匿名帖、审计单和媒体标题在同一天抵达。");
  if (state.stats.stamina <= 0) return endGame("过劳停机", "身体替你按下暂停键，所有材料都先放一边。");
  if (state.stats.funding <= -80) return endGame("财务黑洞", "课题组现金流断裂，连打印纸都开始按张审批。");
  if (state.age >= 73) return endGame("光荣退休", "组织提醒你办理退休手续。你看着没投完的本子，沉默良久。");
  return false;
}

function endGame(title, body) {
  state.gameOver = { title, body, summary: buildSummary(title) };
  state.mode = "gameover";
  addLog(`Game Over：${title}。`);
  renderGameOver();
  return true;
}

function winGame() {
  const title = chooseWinTitle();
  state.gameOver = { title, body: "你走到了学术金字塔顶端。掌声响起时，旧账和旧学生也一起在记忆里站了起来。", summary: buildSummary(title, true) };
  state.mode = "gameover";
  addLog(`最终达成：${title}。`);
  renderGameOver();
  render();
}

function chooseWinTitle() {
  if (state.stats.ethics >= 72 && state.stats.students >= 76) return "桃李满门院士";
  if (state.stats.risk >= 62 || state.stats.ethics < 35) return "KPI巨兽院士";
  if (state.stats.network >= 130) return "江湖共识院士";
  if (state.stats.funding >= 900) return "经费洪流院士";
  return "稳健上岸院士";
}

function buildSummary(title, won = false) {
  const rank = ranks[state.rankIndex].name;
  const exploitLine = state.flags.exploitCount > 0
    ? `你共选择了${state.flags.exploitCount}次高压压榨路线，它确实推高了成果，也把风险和口碑债留在了履历背面。`
    : "你没有走高压压榨路线，速度不一定最快，但队伍的裂纹少了很多。";
  const style = state.stats.ethics >= 70
    ? "整体画像：偏理想主义，愿意用慢一点的方式换长期信任。"
    : state.stats.risk >= 70
      ? "整体画像：高风险冲刺型，履历耀眼，火线也很近。"
      : state.stats.network >= state.stats.prestige
        ? "整体画像：资源整合型，深谙会场、饭局和推荐信的力学。"
        : "整体画像：KPI推进型，擅长把压力压成可提交材料。";

  return [
    `结局：${title}`,
    `最终段位：${rank}`,
    `总用时：${formatTime()}，学术年龄：${state.age}岁`,
    `最终数据：成果${state.stats.papers}篇，经费${state.stats.funding}万，声望${state.stats.prestige}，人脉${state.stats.network}，学生状态${state.stats.students}，师德${state.stats.ethics}，风险${state.stats.risk}。`,
    exploitLine,
    style,
    won ? "这是一条通关路线，但不是唯一答案。下一局也许可以试试少一点热搜，多一点睡眠。" : "这不是终点，只是这一局的学术命运在这里合上。"
  ].join("\n");
}

function renderNormalScene(title, body) {
  els.sceneKicker.textContent = "行动选择";
  els.sceneTitle.textContent = title;
  els.sceneBody.textContent = body;
  renderChoices(normalActions.map(action => ({
    ...action,
    onClick: () => applyAction(action)
  })));
}

function renderSetup() {
  els.sceneKicker.textContent = "建档处";
  els.sceneTitle.textContent = "选择开局条件";
  els.sceneBody.textContent = "你的第一间办公室还没完全收拾好，电脑里已经躺着三封催交材料邮件。";
  els.choiceList.innerHTML = `
    <div class="setup-form">
      <label class="input-label" for="nameInput">导师姓名</label>
      <input id="nameInput" class="text-input" type="text" maxlength="8" placeholder="不填则随机">
      ${renderRadioGroup("school", "入职平台", schools, "省属强校")}
      ${renderRadioGroup("field", "研究方向", fields, "理工实验室")}
      ${renderRadioGroup("temperament", "导师人格", temperaments, "良心导师")}
      <button class="start-button" type="button" id="startButton">开始入职</button>
    </div>
  `;
  document.getElementById("startButton").addEventListener("click", applySetup);
}

function renderRadioGroup(name, title, options, checked) {
  return `
    <fieldset class="radio-group">
      <legend>${title}</legend>
      ${Object.entries(options).map(([key, value]) => `
        <label class="radio-card">
          <input type="radio" name="${name}" value="${key}" ${key === checked ? "checked" : ""}>
          <span>
            <strong>${key}</strong>
            <small>${value.desc}</small>
          </span>
        </label>
      `).join("")}
    </fieldset>
  `;
}

function renderChoices(choices) {
  els.choiceList.innerHTML = "";
  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = `choice-card ${choice.style || ""}`.trim();
    button.type = "button";
    button.innerHTML = `
      <strong>${choice.title}</strong>
      <span>${choice.text}</span>
      ${choice.tag ? `<small>${choice.tag}</small>` : ""}
    `;
    button.addEventListener("click", choice.onClick);
    button.dataset.choice = String(index + 1);
    els.choiceList.appendChild(button);
  });
}

function renderStageTrack() {
  els.stageTrack.innerHTML = ranks.map((rank, index) => {
    const status = index < state.rankIndex ? "done" : index === state.rankIndex ? "active" : "";
    const text = index < state.rankIndex ? "已达成" : index === state.rankIndex ? "当前" : "未解锁";
    return `
      <div class="stage-node ${status}">
        <span class="stage-icon">${rank.icon}</span>
        <span class="stage-label">${rank.name}<small>${rank.subtitle}</small></span>
        <span class="stage-status">${text}</span>
      </div>
    `;
  }).join("");
}

function renderMetrics() {
  els.metricsGrid.innerHTML = metricDefs.map(metric => {
    const value = state.stats[metric.key] ?? 0;
    const width = clamp((value / metric.max) * 100, 0, 100);
    const display = `${value}${metric.unit}`;
    return `
      <div class="metric ${metric.className}">
        <div class="metric-head">
          <span>${metric.label}</span>
          <span class="metric-value">${display}</span>
        </div>
        <div class="meter" aria-hidden="true">
          <div class="meter-fill" style="width:${width}%"></div>
        </div>
      </div>
    `;
  }).join("");
}

function renderGoals() {
  if (state.rankIndex >= ranks.length - 1) {
    els.goalList.innerHTML = `<div class="goal-item met"><strong>已抵达院士</strong><span>终局</span></div>`;
    return;
  }
  els.goalList.innerHTML = goalEntries().map(item => {
    const met = item.maxGoal ? item.value <= item.target : item.value >= item.target;
    const relation = item.maxGoal ? `≤ ${item.target}` : `≥ ${item.target}`;
    return `
      <div class="goal-item ${met ? "met" : ""}">
        <strong>${item.label}</strong>
        <span>${item.value}${item.suffix} / ${relation}${item.suffix}</span>
      </div>
    `;
  }).join("");
}

function renderBadges() {
  els.badgeCount.textContent = `${state.badges.length}枚`;
  if (!state.badges.length) {
    els.badgeList.innerHTML = `<span class="badge empty">还没有履历标签</span>`;
    return;
  }
  els.badgeList.innerHTML = state.badges.map(badge => `<span class="badge">${badge}</span>`).join("");
}

function renderLogs() {
  if (!state.log.length) {
    els.logList.innerHTML = `<li>暂无记录。命运还没开始打印。</li>`;
    return;
  }
  els.logList.innerHTML = state.log.slice(0, 8).map(item => `<li>${item}</li>`).join("");
}

function renderGameOver() {
  const over = state.gameOver;
  if (!over) return;
  els.sceneKicker.textContent = "Game Over";
  els.sceneTitle.textContent = over.title;
  els.sceneBody.textContent = over.body;
  els.choiceList.innerHTML = `
    <div class="ending-panel">
      <pre>${over.summary}</pre>
      <button class="start-button" type="button" id="againButton">再开一局</button>
    </div>
  `;
  document.getElementById("againButton").addEventListener("click", () => {
    state = createBlankState();
    render();
  });
}

function renderHeader() {
  const rank = ranks[state.rankIndex];
  els.mentorName.textContent = state.started ? state.mentor.name : "未建档导师";
  els.mentorMeta.textContent = state.started
    ? `${state.mentor.school} · ${state.mentor.field} · ${state.mentor.temperament}`
    : "等待抽取命运";
  els.mentorAvatar.textContent = state.started ? state.mentor.name.slice(0, 1) : "青";
  els.ageText.textContent = `${state.age}岁`;
  els.timeText.textContent = formatTime();
  els.rankText.textContent = rank.name;
  els.seasonText.textContent = getSeasonText();
  els.mainTitle.textContent = state.started ? `${rank.name}档案` : "建立你的导师档案";
  els.promotionButton.disabled = !state.started || state.mode !== "normal" || !!state.gameOver;
  els.promotionButton.textContent = rank.next ? `申请${rank.next}` : "查看终局";
}

function render() {
  renderHeader();
  renderStageTrack();
  renderMetrics();
  renderGoals();
  renderBadges();
  renderLogs();

  if (!state.started) {
    renderSetup();
  } else if (state.gameOver) {
    renderGameOver();
  } else if (state.mode === "normal" && !els.choiceList.children.length) {
    renderNormalScene("选择本学期行动", "下一顶帽子不会自己飞来。");
  }
}

function saveGame() {
  if (!state.started) {
    showToast("还没建档，暂时没有可保存的导师命运。");
    return;
  }
  if (state.mode !== "normal" && !state.gameOver) {
    showToast("先处理完当前事件或评审，再保存这条命运线。");
    return;
  }
  localStorage.setItem("mentor-promotion-sim-save", JSON.stringify(state));
  showToast("已保存当前学术命运。");
}

function loadGame() {
  const raw = localStorage.getItem("mentor-promotion-sim-save");
  if (!raw) {
    showToast("没有找到存档。");
    return;
  }
  try {
    state = JSON.parse(raw);
    if (state.gameOver) state.mode = "gameover";
    if (state.mode !== "normal" && state.mode !== "gameover") {
      state.mode = "normal";
      state.pendingEvent = null;
      addLog("读取存档时跳过了未完成事件，回到办公室重新整理节奏。");
    }
    if (state.mode === "normal") {
      renderNormalScene("存档读取成功", "你回到了熟悉的办公室，邮件仍然没有少。");
    }
    render();
    showToast("存档已读取。");
  } catch (error) {
    showToast("存档损坏，读取失败。");
  }
}

function showToast(text) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2400);
}

els.promotionButton.addEventListener("click", startPromotion);
els.saveButton.addEventListener("click", saveGame);
els.loadButton.addEventListener("click", loadGame);
els.restartButton.addEventListener("click", () => {
  state = createBlankState();
  render();
});

render();
