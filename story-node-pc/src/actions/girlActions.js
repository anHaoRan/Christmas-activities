import {
  UPDATE_GIRL_HOT_WOMEN,//女频本周热推
  UPDATE_GIRL_HOT_WOMEN_BIG_PUSH,//女频本周热推大字推
  UPDATE_GIRL_HOT_WOMEN_SMALL_PUSH,//女频本周热推小字推
  UPDATE_GIRL_NEW_BOOK_LIST,//女频新书榜
  UPDATE_GIRL_BIG_PRODUCTS_RECOMMENDED,
  UPDATE_GIRL_SMALL_PRODUCTS_RECOMMENDED,

  UPDATE_GIRL_TYPE_ONE,
  UPDATE_GIRL_TYPE_TWO,
  UPDATE_GIRL_TYPE_THREE,
  UPDATE_GIRL_TYPE_FOUR,

  UPDATE_GIRL_BANNER,

} from '../constants/ActionTypes';

export function updateGirlBanner(banner) {
  return {
    type: UPDATE_GIRL_BANNER,
    payload: banner
  };
}
export function updateGirlTypeOne(list) {
  return {
    type: UPDATE_GIRL_TYPE_ONE,
    payload: list
  };
}

export function updateGirlTypeTwo(list) {
  return {
    type: UPDATE_GIRL_TYPE_TWO,
    payload: list
  };
}

export function updateGirlTypeThree(list) {
  return {
    type: UPDATE_GIRL_TYPE_THREE,
    payload: list
  };
}

export function updateGirlTypeFour(list) {
  return {
    type: UPDATE_GIRL_TYPE_FOUR,
    payload: list
  };
}
export function updateGirlBigProductsList(list) {
  return {
    type: UPDATE_GIRL_BIG_PRODUCTS_RECOMMENDED,
    payload: list
  };
}
export function updateGirlSmallProductsList(list) {
  return {
    type: UPDATE_GIRL_SMALL_PRODUCTS_RECOMMENDED,
    payload: list
  };
}
export function updateGirlHotWomenList(list) {
  return {
    type: UPDATE_GIRL_HOT_WOMEN,
    payload: list
  };
}

export function updateGirlHotWomenBigPuchList(list) {
  return {
    type: UPDATE_GIRL_HOT_WOMEN_BIG_PUSH,
    payload: list
  };
}

export function updateGirlHotWomenSmallPuchList(list) {
  return {
    type: UPDATE_GIRL_HOT_WOMEN_SMALL_PUSH,
    payload: list
  };
}

export function updateGirlNewBookList(list) {
  return {
    type: UPDATE_GIRL_NEW_BOOK_LIST,
    payload: list
  };
}

export function updateGirlClassification(list) {
  return {
    type: UPDATE_GIRL_CLASSIFCATION_RECOMMEND,
    payload: list
  };
}

