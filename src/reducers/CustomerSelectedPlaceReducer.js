// @flow strict

import type {Action} from 'constants/CustomerActionTypes';
import type {PlaceDetailed} from 'constants/GoogleAPITypes';

import CustomerSelectedPlaceActionTypes from 'actions/CustomerSelectedPlaceActionTypes';

export type CustomerSelectedPlaceStoreState = {
  place: ?PlaceDetailed,
  hasError: boolean,
  isFetching: boolean,
};

export default function CustomerSelectedPlaceReducer(
  state: CustomerSelectedPlaceStoreState = {
    place: null,
    hasError: false,
    isFetching: false,
  },
  action: Action,
): CustomerSelectedPlaceStoreState {
  switch (action.type) {
    case CustomerSelectedPlaceActionTypes.FETCH_SELECTED_PLACE_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case CustomerSelectedPlaceActionTypes.FETCH_SELECTED_PLACE_ERROR:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    case CustomerSelectedPlaceActionTypes.FETCH_SELECTED_PLACE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        place: action.payload,
      };
    default:
      return state;
  }
}
