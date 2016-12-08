import { 
  UPDATE_DETAILS_INTROSIP_LIST,
  UPDATE_DETAILS_READING,
  UPDATE_DETAILS_MONTICKET_LIST,
  UPDATE_BOY_REWARD_PRODUCT_LIST,
  UPDATE_GIRL_REWARD_PRODUCT_LIST,
} from '../constants/ActionTypes';

import { assign } from 'lodash';

const initialState = {
  // 小说详情信息
  currentStory: {},
  currentStoryRead: {},
  //月票信息列表
  monticketList: [],

  // 男女频小说打赏商品列表
  boyRewardProductList: [],
  girlRewardProductList: [],
};

export default function detailsReducers(state = initialState, action) {
  switch(action.type) {
    case UPDATE_DETAILS_INTROSIP_LIST: {
      return assign({}, state, { currentStory: action.payload });
    }
    case UPDATE_DETAILS_READING: {
      return assign({}, state, { currentStoryRead: action.payload });
    }
    case UPDATE_DETAILS_MONTICKET_LIST: {
      return assign({}, state, { monticketList: action.payload });
    }
    case UPDATE_BOY_REWARD_PRODUCT_LIST: {
      return assign({}, state, { boyRewardProductList: action.payload });
    }
    case UPDATE_GIRL_REWARD_PRODUCT_LIST: {
      return assign({}, state, { girlRewardProductList: action.payload });
    }
  }
  return state;
}