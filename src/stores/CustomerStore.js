// @flow strict

import type {CustomerSelectedPlaceStoreState} from 'reducers/CustomerSelectedPlaceReducer';
import type {Action, Dispatch} from 'constants/CustomerActionTypes';
import type {Store} from 'redux';

import CustomerSelectedPlaceReducer from 'reducers/CustomerSelectedPlaceReducer';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export type CustomerStoreState = {
  selectedPlace: CustomerSelectedPlaceStoreState,
};

type CustomerRootReducerType = (
  state: CustomerStoreState,
  action: Action,
) => CustomerStoreState;

export type CustomerStore = Store<CustomerStoreState, Action, Dispatch>;

const rootReducer: CustomerRootReducerType = combineReducers({
  selectedPlace: CustomerSelectedPlaceReducer,
});

const store: CustomerStore = createStore(rootReducer, applyMiddleware(thunk));

export default store;
