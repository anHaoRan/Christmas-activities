import {
  UPDATE_PAY
} from '../constants/ActionTypes';

export function updateProductList(list) {
  return {
    type: UPDATE_PAY,
    payload: list
  };
}

