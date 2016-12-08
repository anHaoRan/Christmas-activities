import {
  UPDATE_STORY_DETAIL
} from '../constants/ActionTypes';

export function updateCurrentStory(obj) {
  return {
    type: UPDATE_STORY_DETAIL,
    payload: obj
  };
}