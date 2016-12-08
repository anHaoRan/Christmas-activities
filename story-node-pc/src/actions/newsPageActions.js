import {
  UPDATE_NEWS_PAGE
} from '../constants/ActionTypes';

export function updateNewsPage(news) {
  return {
    type: UPDATE_NEWS_PAGE,
    payload: news
  };
}