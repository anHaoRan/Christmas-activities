import {
  UPDATE_HOME_GIRL_POPULARITY_LIST,
  UPDATE_HOME_BOY_POPULARITY_LIST,
  UPDATE_HOME_LEFT_BIG_RECOMMEND,
  UPDATE_HOME_RIGHT_BIG_RECOMMEND,
  UPDATE_HOME_LEFT_SMALL_RECOMMEND_LIST,
  UPDATE_HOME_RIGHT_SMALL_RECOMMEND_LIST,
  UPDATE_HOME_INFOR_LIST,
  UPDATE_HOME_GIRL_HOT_RECOM_LIST,
  UPDATE_HOME_BOY_HOT_RECOM_LIST,
  UPDATE_HOME_FREE_BOOK_LIST,
  UPDATE_HOME_VIP_BOOK_LIST,
  UPDATE_HOME_SLIDER_LIST,
} from '../constants/ActionTypes';

export function updateGirlPopularityList(list) {
  return {
    type: UPDATE_HOME_GIRL_POPULARITY_LIST,
    payload: list
  };
}

export function updateBoyPopularityList(list) {
  return {
    type: UPDATE_HOME_BOY_POPULARITY_LIST,
    payload: list
  };
}

export function updateLeftBigRecommend(recommend) {
  return {
    type: UPDATE_HOME_LEFT_BIG_RECOMMEND,
    payload: recommend
  };
}

export function updateRightBigRecommend(recommend) {
  return {
    type: UPDATE_HOME_RIGHT_BIG_RECOMMEND,
    payload: recommend
  };
}

export function updateLeftSmallRecommendList(list) {
  return {
    type: UPDATE_HOME_LEFT_SMALL_RECOMMEND_LIST,
    payload: list
  };
}

export function updateRightSmallRecommendList(list) {
  return {
    type: UPDATE_HOME_RIGHT_SMALL_RECOMMEND_LIST,
    payload: list
  };
}

export function updateInforList(list) {
  return {
    type: UPDATE_HOME_INFOR_LIST,
    payload: list
  };
}

export function updateGirlHotRecomList(list) {
  return {
    type: UPDATE_HOME_GIRL_HOT_RECOM_LIST,
    payload: list
  };
}

export function updateBoyHotRecomList(list) {
  return {
    type: UPDATE_HOME_BOY_HOT_RECOM_LIST,
    payload: list
  };
}

export function updateFreeBookList(list) {
  return {
    type: UPDATE_HOME_FREE_BOOK_LIST,
    payload: list
  };
}

export function updateVipBookList(list) {
  return {
    type: UPDATE_HOME_VIP_BOOK_LIST,
    payload: list
  };
}

export function updateSliderList(list) {
  return {
    type: UPDATE_HOME_SLIDER_LIST,
    payload: list
  };
}