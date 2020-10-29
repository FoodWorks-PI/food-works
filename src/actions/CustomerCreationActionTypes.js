// @flow strict

import type {CustomerCreation} from 'constants/CustomerCreationTypes';

import keyMirror from 'utils/keyMirror';

const ActionTypes = keyMirror({
  SET_USER_INFO: null,
  DELETE_USER_INFO: null,
});

export type CustomerCreationAction = $ReadOnly<
  | {
      type: typeof ActionTypes.SET_USER_INFO,
      payload: CustomerCreation,
    }
  | {
      type: typeof ActionTypes.DELETE_USER_INFO,
    },
>;

export default ActionTypes;
