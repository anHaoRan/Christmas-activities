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
import { assign } from 'lodash';

const initialState = {
  // -- 书架
  shelf: [],
  // -- 消息中心-通知
  notice: [],
  // -- 消息中心-评论
  comment: [],
  // -- 消息中心-我的回复
  recomment: [],
  // -- 账户管理-充值记录
  payRecord: [],
  // -- 账户管理-消费记录-付费章节消费记录
  payChapterConsumeRecord: [],
  // -- 账户管理-消费记录-打赏记录
  rewardConsumeRecord: [],
  // -- 账户管理-消费记录-投票记录
  voteConsumeRecord: [],
};

export default function userReducers(state = initialState, action) {
  switch(action.type) {
    case UPDATE_USER_SHELF: {
      return assign({}, state, { shelf: action.payload })
    }
    case UPDATE_USER_NOTICE: {
      return assign({}, state, { notice: action.payload })
    }
    case UPDATE_USER_COMMENT: {
      return assign({}, state, { comment: action.payload })
    }
    case UPDATE_USER_RECOMMET: {
      return assign({}, state, { recomment: action.payload })
    }
    case UPDATE_USER_TOPUP_RECORD: {
      return assign({}, state, { payRecord: action.payload })
    }
    case UPDATE_USER_PAY_CHAPTER_CONSUME_RECORD: {
      return assign({}, state, { payChapterConsumeRecord: action.payload })
    }
    case UPDATE_USER_REWARD_CONSUME_RECORD: {
      return assign({}, state, { rewardConsumeRecord: action.payload })
    }
    case UPDATE_USER_VOTE_CONSUME_RECORD: {
      return assign({}, state, { voteConsumeRecord: action.payload })
    }
  }
  return state;
}