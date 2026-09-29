// RFID 行业词表。类别 key、主题 slug 和主体 id 一经上线应保持稳定。
export const CATEGORIES = [
  {
    "key": "technology",
    "label": "技术产品",
    "section": "技术与产品",
    "guide": "RFID 芯片、标签、天线、读写器、传感器、协议与软件平台的发布、参数和工程能力变化"
  },
  {
    "key": "deployments",
    "label": "应用部署",
    "section": "应用与部署",
    "guide": "零售、物流、工业、医药、航空等场景的试点、采购要求、规模部署与运营结果；明确区分计划和落地"
  },
  {
    "key": "industry",
    "label": "企业动态",
    "section": "企业与生态",
    "guide": "RFID 产业公司的财报、产能、并购、融资、供应商合作、资产转让与商业模式变化"
  },
  {
    "key": "standards",
    "label": "标准法规",
    "section": "标准与法规",
    "guide": "GS1、RAIN Alliance、ISO/IEC、3GPP 与监管规则；频谱、认证、ESPR/DPP、PPWR，注明地区和阶段"
  },
  {
    "key": "research",
    "label": "研究方法",
    "section": "研究与实践",
    "guide": "RFID/IoT 论文、白皮书、测试方法、集成经验和基于证据的产业分析；RFID+AI 库存真值与补货预测"
  }
] as const;
export const ITEM_TYPES = [
  "technology_release",
  "product_launch",
  "integration_tool",
  "research_paper",
  "industry_event",
  "opinion_analysis",
  "tutorial_explainer"
] as const;
export const CATEGORY_TAGS = [
  "技术发布",
  "产品更新",
  "应用部署",
  "行业动态",
  "标准/法规",
  "论文/研究",
  "教程/实践",
  "评测/基准",
  "观点/分析",
  "开源/仓库",
  "其他"
] as const;
export const TOPIC_TAGS = [
  "RAIN RFID",
  "HF/NFC",
  "Ambient IoT",
  "RFID+AI",
  "芯片/SoC",
  "标签/天线",
  "读写器",
  "测试/质量",
  "库存真值",
  "补货预测",
  "零售/服装",
  "物流/仓储",
  "工业物联网",
  "医药/医疗",
  "航空/汽车",
  "冷链",
  "智能包装",
  "DPP",
  "GS1 Digital Link",
  "EPCIS",
  "PPWR",
  "循环包装",
  "数据安全",
  "集成/工程"
] as const;
export const ENTITY_TAGS = [
  "Impinj",
  "Zebra",
  "Avery Dennison",
  "Wiliot",
  "NXP",
  "Alien Technology",
  "HID",
  "Sensormatic",
  "Checkpoint",
  "SML",
  "Tageos",
  "Identiv",
  "Trackonomy",
  "Beontag",
  "Xerafy",
  "CAEN RFID",
  "Voyantic",
  "Nordic ID",
  "Chainway",
  "Hopeland",
  "Invengo",
  "复旦微电子",
  "Qualcomm",
  "Walmart",
  "Decathlon",
  "Inditex",
  "GS1",
  "RAIN Alliance",
  "AIM",
  "NFC Forum",
  "3GPP"
] as const;

export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  "rain": "RAIN RFID",
  "rain rfid": "RAIN RFID",
  "uhf": "RAIN RFID",
  "uhf rfid": "RAIN RFID",
  "超高频RFID": "RAIN RFID",
  "nfc": "HF/NFC",
  "hf": "HF/NFC",
  "ambient iot": "Ambient IoT",
  "rfid+ai": "RFID+AI",
  "ground truth": "库存真值",
  "库存Ground Truth": "库存真值",
  "数字产品护照": "DPP",
  "数字产品通行证": "DPP",
  "dpp": "DPP",
  "digital link": "GS1 Digital Link",
  "epcis": "EPCIS",
  "ppwr": "PPWR",
  "艾利丹尼森": "Avery Dennison",
  "斑马": "Zebra",
  "恩智浦": "NXP",
  "远望谷": "Invengo",
  "复旦微": "复旦微电子",
  "合作/生态": "行业动态",
  "融资/收购": "行业动态",
  "合作": "行业动态",
  "融资": "行业动态",
  "并购": "行业动态",
  "收购": "行业动态",
  "财报": "行业动态",
  "政策": "标准/法规",
  "监管": "标准/法规",
  "法规": "标准/法规",
  "标准": "标准/法规",
  "政策/监管": "标准/法规",
  "论文": "论文/研究",
  "研究": "论文/研究",
  "paper": "论文/研究",
  "papers": "论文/研究",
  "open-source": "开源/仓库",
  "开源": "开源/仓库",
  "仓库": "开源/仓库",
  "教程": "教程/实践",
  "指南": "教程/实践",
  "实践": "教程/实践",
  "技巧/最佳实践": "教程/实践",
  "产品": "产品更新",
  "更新": "产品更新",
  "发布": "技术发布",
  "部署": "应用部署",
  "案例": "应用部署",
  "评测": "评测/基准",
  "测试": "测试/质量",
  "观点": "观点/分析",
  "趋势": "观点/分析",
  "行业": "行业动态"
};
export const CATEGORY_BY_ITEM_TYPE: Readonly<Record<string, string>> = {
  "technology_release": "技术发布",
  "product_launch": "产品更新",
  "integration_tool": "教程/实践",
  "research_paper": "论文/研究",
  "industry_event": "行业动态",
  "opinion_analysis": "观点/分析",
  "tutorial_explainer": "教程/实践"
};
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[] }> = {
  "impinj": {
    "name": "Impinj",
    "displayTag": "Impinj",
    "aliases": [
      "Impinj",
      "英频杰"
    ]
  },
  "zebra": {
    "name": "Zebra",
    "displayTag": "Zebra",
    "aliases": [
      "Zebra",
      "Zebra Technologies",
      "斑马技术"
    ]
  },
  "avery-dennison": {
    "name": "Avery Dennison",
    "displayTag": "Avery Dennison",
    "aliases": [
      "Avery Dennison",
      "Smartrac",
      "艾利丹尼森"
    ]
  },
  "wiliot": {
    "name": "Wiliot",
    "displayTag": "Wiliot",
    "aliases": [
      "Wiliot"
    ]
  },
  "nxp": {
    "name": "NXP",
    "displayTag": "NXP",
    "aliases": [
      "NXP",
      "恩智浦"
    ]
  },
  "alien": {
    "name": "Alien Technology",
    "displayTag": "Alien Technology",
    "aliases": [
      "Alien Technology"
    ]
  },
  "hid": {
    "name": "HID",
    "displayTag": "HID",
    "aliases": [
      "HID",
      "HID Global"
    ]
  },
  "sensormatic": {
    "name": "Sensormatic",
    "displayTag": "Sensormatic",
    "aliases": [
      "Sensormatic",
      "先讯美资"
    ]
  },
  "checkpoint": {
    "name": "Checkpoint",
    "displayTag": "Checkpoint",
    "aliases": [
      "Checkpoint",
      "Checkpoint Systems",
      "保点"
    ]
  },
  "sml": {
    "name": "SML",
    "displayTag": "SML",
    "aliases": [
      "SML"
    ]
  },
  "tageos": {
    "name": "Tageos",
    "displayTag": "Tageos",
    "aliases": [
      "Tageos"
    ]
  },
  "identiv": {
    "name": "Identiv",
    "displayTag": "Identiv",
    "aliases": [
      "Identiv"
    ]
  },
  "trackonomy": {
    "name": "Trackonomy",
    "displayTag": "Trackonomy",
    "aliases": [
      "Trackonomy"
    ]
  },
  "beontag": {
    "name": "Beontag",
    "displayTag": "Beontag",
    "aliases": [
      "Beontag",
      "Confidex"
    ]
  },
  "xerafy": {
    "name": "Xerafy",
    "displayTag": "Xerafy",
    "aliases": [
      "Xerafy"
    ]
  },
  "caen": {
    "name": "CAEN RFID",
    "displayTag": "CAEN RFID",
    "aliases": [
      "CAEN RFID"
    ]
  },
  "voyantic": {
    "name": "Voyantic",
    "displayTag": "Voyantic",
    "aliases": [
      "Voyantic"
    ]
  },
  "nordic-id": {
    "name": "Nordic ID",
    "displayTag": "Nordic ID",
    "aliases": [
      "Nordic ID"
    ]
  },
  "chainway": {
    "name": "Chainway",
    "displayTag": "Chainway",
    "aliases": [
      "Chainway"
    ]
  },
  "hopeland": {
    "name": "Hopeland",
    "displayTag": "Hopeland",
    "aliases": [
      "Hopeland"
    ]
  },
  "invengo": {
    "name": "Invengo",
    "displayTag": "Invengo",
    "aliases": [
      "Invengo",
      "远望谷"
    ]
  },
  "fudan": {
    "name": "复旦微电子",
    "displayTag": "复旦微电子",
    "aliases": [
      "复旦微电子",
      "Fudan Microelectronics",
      "复旦微"
    ]
  },
  "qualcomm": {
    "name": "Qualcomm",
    "displayTag": "Qualcomm",
    "aliases": [
      "Qualcomm",
      "高通"
    ]
  },
  "walmart": {
    "name": "Walmart",
    "displayTag": "Walmart",
    "aliases": [
      "Walmart",
      "Wal-Mart",
      "沃尔玛"
    ]
  },
  "decathlon": {
    "name": "Decathlon",
    "displayTag": "Decathlon",
    "aliases": [
      "Decathlon",
      "迪卡侬"
    ]
  },
  "inditex": {
    "name": "Inditex",
    "displayTag": "Inditex",
    "aliases": [
      "Inditex",
      "Zara"
    ]
  },
  "gs1": {
    "name": "GS1",
    "displayTag": "GS1",
    "aliases": [
      "GS1",
      "EPCglobal"
    ]
  },
  "rain-alliance": {
    "name": "RAIN Alliance",
    "displayTag": "RAIN Alliance",
    "aliases": [
      "RAIN Alliance",
      "RAIN RFID Alliance"
    ]
  },
  "aim": {
    "name": "AIM",
    "displayTag": "AIM",
    "aliases": [
      "AIM",
      "AIM Global",
      "AIM Inc."
    ]
  },
  "nfc-forum": {
    "name": "NFC Forum",
    "displayTag": "NFC Forum",
    "aliases": [
      "NFC Forum"
    ]
  },
  "3gpp": {
    "name": "3GPP",
    "displayTag": "3GPP",
    "aliases": [
      "3GPP"
    ]
  }
};

// 只认名称及明确别名，不把协议、频段或通用型号当作一家公司的专属身份。
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "impinj", name: "Impinj", patterns: [/\bImpinj\b/i, /英频杰/i] },
  { id: "zebra", name: "Zebra", patterns: [/\bZebra\b/i, /\bZebra\s+Technologies\b/i, /斑马技术/i] },
  { id: "avery-dennison", name: "Avery Dennison", patterns: [/\bAvery\s+Dennison\b/i, /\bSmartrac\b/i, /艾利丹尼森/i] },
  { id: "wiliot", name: "Wiliot", patterns: [/\bWiliot\b/i] },
  { id: "nxp", name: "NXP", patterns: [/\bNXP\b/i, /恩智浦/i] },
  { id: "alien", name: "Alien Technology", patterns: [/\bAlien\s+Technology\b/i] },
  { id: "hid", name: "HID", patterns: [/\bHID\b/, /\bHID\s+Global\b/] },
  { id: "sensormatic", name: "Sensormatic", patterns: [/\bSensormatic\b/i, /先讯美资/i] },
  { id: "checkpoint", name: "Checkpoint", patterns: [/\bCheckpoint\s+Systems\b/i, /保点/i] },
  { id: "sml", name: "SML", patterns: [/\bSML\b/] },
  { id: "tageos", name: "Tageos", patterns: [/\bTageos\b/i] },
  { id: "identiv", name: "Identiv", patterns: [/\bIdentiv\b/i] },
  { id: "trackonomy", name: "Trackonomy", patterns: [/\bTrackonomy\b/i] },
  { id: "beontag", name: "Beontag", patterns: [/\bBeontag\b/i, /\bConfidex\b/i] },
  { id: "xerafy", name: "Xerafy", patterns: [/\bXerafy\b/i] },
  { id: "caen", name: "CAEN RFID", patterns: [/\bCAEN\s+RFID\b/i] },
  { id: "voyantic", name: "Voyantic", patterns: [/\bVoyantic\b/i] },
  { id: "nordic-id", name: "Nordic ID", patterns: [/\bNordic\s+ID\b/i] },
  { id: "chainway", name: "Chainway", patterns: [/\bChainway\b/i] },
  { id: "hopeland", name: "Hopeland", patterns: [/\bHopeland\b/i] },
  { id: "invengo", name: "Invengo", patterns: [/\bInvengo\b/i, /远望谷/i] },
  { id: "fudan", name: "复旦微电子", patterns: [/复旦微电子/i, /\bFudan\s+Microelectronics\b/i, /复旦微/i] },
  { id: "qualcomm", name: "Qualcomm", patterns: [/\bQualcomm\b/i, /高通/i] },
  { id: "walmart", name: "Walmart", patterns: [/\bWalmart\b/i, /\bWal-Mart\b/i, /沃尔玛/i] },
  { id: "decathlon", name: "Decathlon", patterns: [/\bDecathlon\b/i, /迪卡侬/i] },
  { id: "inditex", name: "Inditex", patterns: [/\bInditex\b/i, /\bZara\b/i] },
  { id: "gs1", name: "GS1", patterns: [/\bGS1\b/i, /\bEPCglobal\b/i] },
  { id: "rain-alliance", name: "RAIN Alliance", patterns: [/\bRAIN\s+Alliance\b/i, /\bRAIN\s+RFID\s+Alliance\b/i] },
  { id: "aim", name: "AIM", patterns: [/\bAIM\s+Global\b/i, /\bAIM\s+Inc\.\b/i] },
  { id: "nfc-forum", name: "NFC Forum", patterns: [/\bNFC\s+Forum\b/i] },
  { id: "3gpp", name: "3GPP", patterns: [/\b3GPP\b/i] },
];
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  {
    "entityId": "impinj",
    "domains": [
      "impinj.com"
    ]
  },
  {
    "entityId": "zebra",
    "domains": [
      "zebra.com"
    ]
  },
  {
    "entityId": "avery-dennison",
    "domains": [
      "averydennison.com"
    ]
  },
  {
    "entityId": "wiliot",
    "domains": [
      "wiliot.com"
    ]
  },
  {
    "entityId": "nxp",
    "domains": [
      "nxp.com"
    ]
  },
  {
    "entityId": "tageos",
    "domains": [
      "tageos.com"
    ]
  },
  {
    "entityId": "identiv",
    "domains": [
      "identiv.com"
    ]
  },
  {
    "entityId": "beontag",
    "domains": [
      "beontag.com",
      "confidex.com"
    ]
  },
  {
    "entityId": "voyantic",
    "domains": [
      "voyantic.com"
    ]
  },
  {
    "entityId": "xerafy",
    "domains": [
      "xerafy.com"
    ]
  },
  {
    "entityId": "walmart",
    "domains": [
      "walmart.com"
    ]
  },
  {
    "entityId": "decathlon",
    "domains": [
      "decathlon.com"
    ]
  },
  {
    "entityId": "inditex",
    "domains": [
      "inditex.com"
    ]
  },
  {
    "entityId": "gs1",
    "domains": [
      "gs1.org"
    ]
  },
  {
    "entityId": "rain-alliance",
    "domains": [
      "therainalliance.org",
      "rainrfid.org"
    ]
  },
  {
    "entityId": "nfc-forum",
    "domains": [
      "nfc-forum.org"
    ]
  },
  {
    "entityId": "3gpp",
    "domains": [
      "3gpp.org"
    ]
  }
];
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [];
