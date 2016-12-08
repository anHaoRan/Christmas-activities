import {
  UPDATE_SEARCH_RESULT_LIST,
  UPDATE_SEARCH_RECOMMEND_LIST
} from '../constants/ActionTypes';

export function updateSearchResultList(list) {
  return {
    type: UPDATE_SEARCH_RESULT_LIST,
    payload: list
  };
}