import {
  UPDATE_LIBRARY_LIST
} from '../constants/ActionTypes';

export function updateLibraryList(list) {
  return {
    type: UPDATE_LIBRARY_LIST,
    payload: list
  };
}


