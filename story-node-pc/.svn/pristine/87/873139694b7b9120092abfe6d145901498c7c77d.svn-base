import { 
  UPDATE_NEWS_PAGE
} from '../constants/ActionTypes';

import { assign } from 'lodash';

const initialState = {
  news: {},
};

export default function newsPageReducers(state = initialState, action) {
  switch(action.type) {
    case UPDATE_NEWS_PAGE: {
      return assign({}, state, { news: action.payload });
    }
  }
  return state;
}