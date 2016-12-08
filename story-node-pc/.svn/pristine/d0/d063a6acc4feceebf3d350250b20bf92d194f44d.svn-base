import { 
  UPDATE_HOME_GIRL_POPULARITY_LIST,
  UPDATE_HOME_BOY_POPULARITY_LIST,
  UPDATE_HOME_LEFT_BIG_RECOMMEND,
  UPDATE_HOME_RIGHT_BIG_RECOMMEND,
  UPDATE_HOME_LEFT_SMALL_RECOMMEND_LIST,
  UPDATE_HOME_RIGHT_SMALL_RECOMMEND_LIST,
  UPDATE_HOME_INFOR_LIST,
  UPDATE_HOME_GIRL_HOT_RECOM_LIST,
  UPDATE_HOME_BOY_HOT_RECOM_LIST,

  UPDATE_HOME_FREE_BOOK_LIST,
  UPDATE_HOME_VIP_BOOK_LIST,

  UPDATE_HOME_SLIDER_LIST
} from '../constants/ActionTypes';

import { assign } from 'lodash';

const initialState = {
  // 女生人气榜
  girlPopularityList: [],
  // 男生人气榜
  boyPopularityList: [],
  // 右侧大字推
  rightBigRecommend: {story: {}},
  // 左侧大字推
  leftBigRecommend: {story: {}},
  // 右侧小字推
  rightSmallRecommendList: [],
  // 左侧小字推
  leftSmallRecommendList: [],
  // 首页资讯
  inforList: [],
  //首页女火力推荐
  girlHotRecomList: [],
  //首页男火力推荐
  boyHotRecomList: [],
  //首页免费小说列表
  freeBookList: [],
  //首页VIP小说列表
  vipBookList: [],
  //首页轮播图
  sliderList: []
};

export default function homeReducers(state = initialState, action) {
  switch(action.type) {
    case UPDATE_HOME_GIRL_POPULARITY_LIST: {
      return assign({}, state, { girlPopularityList: action.payload });
    }
    case UPDATE_HOME_BOY_POPULARITY_LIST: {
      return assign({}, state, { boyPopularityList: action.payload });
    }
    case UPDATE_HOME_LEFT_BIG_RECOMMEND: {
      return assign({}, state, { leftBigRecommend: action.payload });
    }
    case UPDATE_HOME_RIGHT_BIG_RECOMMEND: {
      return assign({}, state, { rightBigRecommend: action.payload });
    }
    case UPDATE_HOME_LEFT_SMALL_RECOMMEND_LIST: {
      return assign({}, state, { leftSmallRecommendList: action.payload });
    }
    case UPDATE_HOME_RIGHT_SMALL_RECOMMEND_LIST: {
      return assign({}, state, { rightSmallRecommendList: action.payload });
    }
    case UPDATE_HOME_INFOR_LIST: {
      return assign({}, state, { inforList: action.payload });
    }
    case UPDATE_HOME_GIRL_HOT_RECOM_LIST: {
      return assign({}, state, { girlHotRecomList: action.payload });
    }
    case UPDATE_HOME_BOY_HOT_RECOM_LIST: {
      return assign({}, state, { boyHotRecomList: action.payload });
    }
    case UPDATE_HOME_FREE_BOOK_LIST: {
      return assign({}, state, { freeBookList: action.payload });
    }
    case UPDATE_HOME_VIP_BOOK_LIST: {
      return assign({}, state, { vipBookList: action.payload });
    }
    case UPDATE_HOME_SLIDER_LIST: {
      return assign({}, state, { sliderList: action.payload });
    }
  }
  return state;
}