import { 
  UPDATE_STORY_DETAIL,
} from '../constants/ActionTypes';

import { assign } from 'lodash';

const initialState = {
  // 小说详情信息
  currentStory: {},
};

export default function readingReducers(state = initialState, action) {
  switch(action.type) {
    case UPDATE_STORY_DETAIL: {
      return assign({}, state, { currentStory: action.payload });
    }
  }
  return state;
}