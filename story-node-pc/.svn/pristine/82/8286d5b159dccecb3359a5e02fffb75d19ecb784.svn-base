import { 
  UPDATE_SEARCH_RESULT_LIST,
} from '../constants/ActionTypes';

import { assign } from 'lodash';

const initialState = {
  // 搜索结果
  searchList: [],
};

export default function searchReducers(state = initialState, action) {
  switch(action.type) {
    case UPDATE_SEARCH_RESULT_LIST: {
      return assign({}, state, { searchList: action.payload });
    }
  }
  return state;
}