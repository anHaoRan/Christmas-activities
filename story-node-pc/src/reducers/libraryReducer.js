import { 
  UPDATE_LIBRARY_LIST
} from '../constants/ActionTypes';

import { assign } from 'lodash';

const girlLabel = [
  '全部','穿越','悬疑','耽美','架空','甜宠','历史','重生','宅斗','仙侠','复仇','种田','宫斗','虐恋','女强','豪门','灵异','都市','末世','科幻','江湖','学生','教师','总裁','高干','百合','娱乐圈','时尚','青春','性别转换','宫廷','西方罗曼','异世大陆','欢喜冤家','恋爱契约','前世今生','青梅竹马','古穿今','强强','网游','职场','婆媳','商战','相爱相杀','制服','精英','破镜重圆','民国','星际','公路文','武侠','爆笑','婚恋','权谋','奇幻','竞技','美食','推理','系统','随身空间','乡村田园','异国情缘','军旅','其他'
];

const boyLabel = [
  '全部','热血','仙侠','逆袭','种田','游戏','兵王','穿越','悬疑','历史','重生','异能','医生','废材','凡人流','竞技','惊悚','灵异','扮猪吃虎','校园','天才流','二次元','爽文','都市','刑侦','升级','末世','推理','科幻','学生','教师','军事','奇幻','异世大陆','网游','星际','鉴宝','英雄联盟','进化','无限','异世','无敌','异界','玄幻','魔幻','武侠','架空','外国历史','职场','娱乐','乡土','同人','都市修真','系统流','西游','三国','杀伐果断','盗墓','其他'
];

const initialState = {
  // 男频
  //本周热推
  filrateList: {
    channel: [
      '女频', '男频' 
    ],
    classification: [
      [],
      ['全部', '现代都市', '悬疑灵异', '玄幻仙侠', '历史军事'],
      ['全部', '现代言情', '古代言情', '仙侠奇幻', '耽美纯爱'],
    ],
    tags: [
      [],
      boyLabel,
      girlLabel,
    ],
    numberOfwords:[
      '全部', '30万以下', '30-50万', '50-100万', '100万以上'
    ],
    updateTime:[
      '全部', '三日内', '七日内', '半月内', '一月内'
    ],
    option:[
      '全部', '免费', '收费'
    ]
  },
  result: {}
};

export default function libraryReducers(state = initialState, action) {
  switch(action.type) {
    case UPDATE_LIBRARY_LIST: {
      return assign({}, state, { result: action.payload });
    }
  }
  return state;
}