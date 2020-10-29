/* eslint-disable no-use-before-define */
// @flow strict

import type {CustomerSelectedPlaceAction} from 'actions/CustomerSelectedPlaceActionTypes';
import type {CustomerCreationAction} from 'actions/CustomerCreationActionTypes';
import type {CustomerStoreState} from 'stores/CustomerStore';

export type Dispatch = (action: Action | ThunkAction) => void;

export type Action = CustomerSelectedPlaceAction | CustomerCreationAction;

export type ThunkGetState = () => CustomerStoreState;

export type ThunkAction = (
  dispatch: Dispatch,
  getState: ThunkGetState,
) => void | Promise<void>;
