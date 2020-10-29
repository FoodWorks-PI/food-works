// @flow strict

import type {Action} from 'constants/CustomerActionTypes';
import type {CustomerCreation} from 'constants/CustomerCreationTypes';

import CustomerCreationActionTypes from 'actions/CustomerCreationActionTypes';

export type CustomerCreationStoreState = {
  creation: ?CustomerCreation,
};

export default function CustomerCreationReducer(
  state: CustomerCreationStoreState = {
    creation: null,
  },
  action: Action,
): CustomerCreationStoreState {
  switch (action.type) {
    case CustomerCreationActionTypes.SET_USER_INFO:
      return {
        ...state,
        creation: action.payload,
      };
    case CustomerCreationActionTypes.DELETE_USER_INFO:
      return {
        ...state,
        creation: null,
      };
    default:
      return state;
  }
}
