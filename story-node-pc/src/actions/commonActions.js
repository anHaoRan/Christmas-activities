import {
  UPDATE_HEADER_HOTPUSH_LIST,
  UPDATE_CURRENT_USER,
  UPDATE_LOGIN_MODAL_STATE
} from '../constants/ActionTypes';

export function updateHeaderHotpushList(list) {
  return {
    type: UPDATE_HEADER_HOTPUSH_LIST,
    payload: list
  };
}

export function updateCurrentUser(user) {
  return {
    type: UPDATE_CURRENT_USER,
    payload: user
  };
}

export function updateLoginModalState(opened) {
  return {
    type: UPDATE_LOGIN_MODAL_STATE,
    payload: opened
  };
}
