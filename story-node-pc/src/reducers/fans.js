import { 
  UPDATE_FANS_FANSALLRANK_LIST,
  UPDATE_FANS_NOVELDETAILS_LIST
} from '../constants/ActionTypes';

import { assign } from 'lodash';

const initialState = {
  // 粉丝榜
  fansAllRankList: [],
  //小说信息
  fansNovelDetails: []
};

export default function detailsReducers(state = initialState, action) {
  switch(action.type) {
    case UPDATE_FANS_FANSALLRANK_LIST: {
      return assign({}, state, { fansAllRankList: action.payload });
    }
    case UPDATE_FANS_NOVELDETAILS_LIST: {
      return assign({}, state, { fansNovelDetails: action.payload });
    }
  }
  return state;
}