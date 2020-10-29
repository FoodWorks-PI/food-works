// @flow strict

import type {Action} from 'constants/CustomerActionTypes';
import type {CustomerCreation} from 'constants/CustomerCreationTypes';

import CustomerCreationActionTypes from 'actions/CustomerCreationActionTypes';

export function setUserData(data: CustomerCreation): Action {
  return {
    type: CustomerCreationActionTypes.SET_USER_INFO,
    payload: data,
  };
}
