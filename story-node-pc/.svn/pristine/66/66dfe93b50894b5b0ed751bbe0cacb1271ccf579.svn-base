import { 
  UPDATE_PAY
} from '../constants/ActionTypes';

import { assign } from 'lodash';

const initialState = {
  productList: [],
};

export default function payReducers(state = initialState, action) {
  switch(action.type) {
    case UPDATE_PAY: {
      return assign({}, state, { productList: action.payload });
    }
  }
  return state;
}