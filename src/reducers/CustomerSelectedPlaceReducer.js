// @flow strict

import type {Action} from 'constants/CustomerActionTypes';
import type {PlaceDetailed} from 'constants/GoogleAPITypes';
import type GoogleAPIError from 'utils/GoogleAPIError';

import CustomerSelectedPlaceActionTypes from 'actions/CustomerSelectedPlaceActionTypes';

export type CustomerSelectedPlaceStoreState = {
  place: ?PlaceDetailed,
  hasError: boolean,
  isFetching: boolean,
  error: ?GoogleAPIError,
};

export default function CustomerSelectedPlaceReducer(
  state: CustomerSelectedPlaceStoreState = {
    place: null,
    hasError: false,
    isFetching: false,
    error: null,
  },
  action: Action,
): CustomerSelectedPlaceStoreState {
  switch (action.type) {
    case CustomerSelectedPlaceActionTypes.FETCH_SELECTED_PLACE_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        error: null,
      };
    case CustomerSelectedPlaceActionTypes.FETCH_SELECTED_PLACE_ERROR:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        error: action.payload,
      };
    case CustomerSelectedPlaceActionTypes.FETCH_SELECTED_PLACE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        error: null,
        place: action.payload,
      };
    default:
      return state;
  }
}
