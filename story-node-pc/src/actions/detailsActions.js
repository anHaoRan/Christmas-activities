import {
  UPDATE_DETAILS_INTROSIP_LIST,
  UPDATE_DETAILS_READING,
  UPDATE_DETAILS_MONTICKET_LIST,
  UPDATE_BOY_REWARD_PRODUCT_LIST,
  UPDATE_GIRL_REWARD_PRODUCT_LIST,
} from '../constants/ActionTypes';

export function updateCurrentStory(obj) {
  return {
    type: UPDATE_DETAILS_INTROSIP_LIST,
    payload: obj
  };
}

export function updateCurrentStoryRead(obj) {
  return {
    type: UPDATE_DETAILS_READING,
    payload: obj
  };
}

export function updateMonTicketList(list) {
  return {
    type: UPDATE_DETAILS_MONTICKET_LIST,
    payload: list
  };
}

export function updateBoyRewardProductList(list) {
  return {
    type: UPDATE_BOY_REWARD_PRODUCT_LIST,
    payload: list
  };
}

export function updateGrilRewardProductList(list) {
  return {
    type: UPDATE_GIRL_REWARD_PRODUCT_LIST,
    payload: list
  };
}