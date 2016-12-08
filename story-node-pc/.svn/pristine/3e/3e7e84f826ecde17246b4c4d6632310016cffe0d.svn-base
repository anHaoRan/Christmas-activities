import { 
  UPDATE_BOY_HOT_WOMEN,
  UPDATE_BOY_BIG_PUSH,
  UPDATE_BOY_SMALL_PUSH,
  UPDATE_BOY_NEW_BOOK_LIST,
  UPDATE_BOY_BIG_PRODUCTS_RECOMMENDED,
  UPDATE_BOY_SMALL_PRODUCTS_RECOMMENDED,

  UPDATE_BOY_TYPE_ONE,
  UPDATE_BOY_TYPE_TWO,
  UPDATE_BOY_TYPE_THREE,
  UPDATE_BOY_TYPE_FOUR,

  UPDATE_BOY_BANNER,
} from '../constants/ActionTypes';

import { assign } from 'lodash';

const initialState = {
  // 男频
  // 本周热推
  banner: {},
  hotWomenList: [],
  boyBigPushList: [],
  boySmallPushList: [],
  newBookList: [],
  bigProducts: [],
  smallProducts: [],
  // 男频分类推荐
  boyTypeOne: [], 
  boyTypeTwo: [], 
  boyTypeThree: [], 
  boyTypeFour: [], 
};

export default function boyReducers(state = initialState, action) {
  switch(action.type) {
    case UPDATE_BOY_BANNER: {
      return assign({}, state, { banner: action.payload });
    }
    case UPDATE_BOY_TYPE_ONE: {
      return assign({}, state, { boyTypeOne: action.payload });
    }
    case UPDATE_BOY_TYPE_TWO: {
      return assign({}, state, { boyTypeTwo: action.payload });
    }
    case UPDATE_BOY_TYPE_THREE: {
      return assign({}, state, { boyTypeThree: action.payload });
    }
    case UPDATE_BOY_TYPE_FOUR: {
      return assign({}, state, { boyTypeFour: action.payload });
    }
    case UPDATE_BOY_BIG_PRODUCTS_RECOMMENDED: {
      return assign({}, state, { bigProducts: action.payload });
    }
    case UPDATE_BOY_SMALL_PRODUCTS_RECOMMENDED: {
      return assign({}, state, { smallProducts: action.payload });
    }
    case UPDATE_BOY_BIG_PUSH: {
      return assign({}, state, { boyBigPushList: action.payload });
    }
    case UPDATE_BOY_SMALL_PUSH: {
      return assign({}, state, { boySmallPushList: action.payload });
    }
    case UPDATE_BOY_HOT_WOMEN: {
      return assign({}, state, { hotWomenList: action.payload });
    }
    case UPDATE_BOY_NEW_BOOK_LIST: {
      return assign({}, state, { newBookList: action.payload });
    }
  }
  return state;
}