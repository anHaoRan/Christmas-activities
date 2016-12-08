import {
  UPDATE_USER_SHELF,
  UPDATE_USER_NOTICE,
  UPDATE_USER_COMMENT,
  UPDATE_USER_RECOMMET,
  UPDATE_USER_TOPUP_RECORD,
  UPDATE_USER_PAY_CHAPTER_CONSUME_RECORD,
  UPDATE_USER_REWARD_CONSUME_RECORD,
  UPDATE_USER_VOTE_CONSUME_RECORD,
} from '../constants/ActionTypes';

export function updateUserShelf(list) {
  return {
    type: UPDATE_USER_SHELF,
    payload: list
  };
}
export function updateUserNotice(list) {
  return {
    type: UPDATE_USER_NOTICE,
    payload: list
  };
}
export function updateUserComment(list) {
  return {
    type: UPDATE_USER_COMMENT,
    payload: list
  };
}
export function updateUserRecomment(list) {
  return {
    type: UPDATE_USER_RECOMMET,
    payload: list
  };
}
export function updateUserPayRecord(list) {
  return {
    type: UPDATE_USER_TOPUP_RECORD,
    payload: list
  };
}
export function updateUserPayChapterConsumeRecord(list) {
  return {
    type: UPDATE_USER_PAY_CHAPTER_CONSUME_RECORD,
    payload: list
  };
}
export function updateUserRewardConsumeRecord(list) {
  return {
    type: UPDATE_USER_REWARD_CONSUME_RECORD,
    payload: list
  };
}
export function updateUserVoteConsumeRecord(list) {
  return {
    type: UPDATE_USER_VOTE_CONSUME_RECORD,
    payload: list
  };
}