import { 
  UPDATE_GIRL_HOT_WOMEN,
  UPDATE_GIRL_HOT_WOMEN_BIG_PUSH,
  UPDATE_GIRL_HOT_WOMEN_SMALL_PUSH,
  UPDATE_GIRL_BIG_PRODUCTS_RECOMMENDED,
  UPDATE_GIRL_SMALL_PRODUCTS_RECOMMENDED,

  UPDATE_GIRL_TYPE_ONE,
  UPDATE_GIRL_TYPE_TWO,
  UPDATE_GIRL_TYPE_THREE,
  UPDATE_GIRL_TYPE_FOUR,

  UPDATE_GIRL_BANNER,
} from '../constants/ActionTypes';

import { assign } from 'lodash';

const initialState = {
  // 女频
  hotWomenList: [], // 本周热推
  hotWomenBigPuchList: [], // 本周热推---大字推
  hotWomenSmallPuchList: [], // 本周热推--小字推
  bigProducts: [], // 精品推荐大图
  smallProducts: [], // 精品推荐小图
  // 分类推荐-四项
  girlTypeOne: [], 
  girlTypeTwo: [], 
  girlTypeThree: [], 
  girlTypeFour: [], 
  banner: {}, // 女频长banner图
};

export default function girlReducers(state = initialState, action) {
  switch(action.type) {
    case UPDATE_GIRL_BANNER: {
      return assign({}, state, { banner: action.payload });
    }
    case UPDATE_GIRL_TYPE_ONE: {
      return assign({}, state, { girlTypeOne: action.payload });
    }
    case UPDATE_GIRL_TYPE_TWO: {
      return assign({}, state, { girlTypeTwo: action.payload });
    }
    case UPDATE_GIRL_TYPE_THREE: {
      return assign({}, state, { girlTypeThree: action.payload });
    }
    case UPDATE_GIRL_TYPE_FOUR: {
      return assign({}, state, { girlTypeFour: action.payload });
    }
    case UPDATE_GIRL_SMALL_PRODUCTS_RECOMMENDED: {
      return assign({}, state, { smallProducts: action.payload });
    }
     case UPDATE_GIRL_BIG_PRODUCTS_RECOMMENDED: {
      return assign({}, state, { bigProducts: action.payload });
    }
    case UPDATE_GIRL_HOT_WOMEN: {
      return assign({}, state, { hotWomenList: action.payload });
    }
    case UPDATE_GIRL_HOT_WOMEN_BIG_PUSH: {
      return assign({}, state, { hotWomenBigPuchList: action.payload });
    }
    case UPDATE_GIRL_HOT_WOMEN_SMALL_PUSH: {
      return assign({}, state, { hotWomenSmallPuchList: action.payload });
    }
  }
  return state;
}