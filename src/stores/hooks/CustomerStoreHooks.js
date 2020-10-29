// @flow

import type {Action, Dispatch} from 'constants/CustomerActionTypes';
import type {CustomerStore, CustomerStoreState} from 'stores/CustomerStore';
import type {ReduxReactHooks} from 'redux-react-hook';

import {create} from 'redux-react-hook';
import shallowEqual from 'shallowequal';

// Example in Flow where you have defined IState and Action
export const {StoreContext, useDispatch, useMappedState} = (create({
  defaultEqualityCheck: shallowEqual,
}): ReduxReactHooks<CustomerStoreState, Action, Dispatch, CustomerStore>);
