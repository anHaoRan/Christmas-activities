import { 
  UPDATE_HEADER_HOTPUSH_LIST,
  UPDATE_CURRENT_USER,
  UPDATE_LOGIN_MODAL_STATE
} from '../constants/ActionTypes';

import { assign } from 'lodash';

const initialState = {
  // 热推
  headerHotpush: [],
  // 当前登录用户
  user: {},
  loginModalOpened: false
};

export default function searchReducers(state = initialState, action) {
  switch(action.type) {
    case UPDATE_HEADER_HOTPUSH_LIST: {
      return assign({}, state, { headerHotpush: action.payload });
    }
    case UPDATE_CURRENT_USER: {
      return assign({}, state, { user: action.payload });
    }
    case UPDATE_LOGIN_MODAL_STATE: {
      return assign({}, state, { loginModalOpened: action.payload });
    }
  }
  return state;
}