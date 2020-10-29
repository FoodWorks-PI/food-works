// @flow

import type {Dispatch, ThunkAction, ThunkGetState} from 'constants/CustomerActionTypes';

import {placeDetails, geocodeReverse} from 'services/GoogleAPI';
import CustomerSelectedPlaceActionTypes from 'actions/CustomerSelectedPlaceActionTypes';

export function loadPlaceFromDetails(
  placeId: string,
  sessiontoken: string,
): ThunkAction {
  return (dispatch: Dispatch, getState: ThunkGetState) => {
    if (getState().selectedPlace.isFetching) {
      return Promise.resolve();
    }
    dispatch({type: CustomerSelectedPlaceActionTypes.FETCH_SELECTED_PLACE_REQUEST});

    return placeDetails(placeId, sessiontoken)
      .then((place) =>
        dispatch({
          type: CustomerSelectedPlaceActionTypes.FETCH_SELECTED_PLACE_SUCCESS,
          payload: place,
        }),
      )
      .catch((error) =>
        dispatch({
          type: CustomerSelectedPlaceActionTypes.FETCH_SELECTED_PLACE_ERROR,
        }),
      );
  };
}

export function loadPlaceFromReverse(lat: string, lon: string): ThunkAction {
  return (dispatch: Dispatch, getState: ThunkGetState) => {
    if (getState().selectedPlace.isFetching) {
      return Promise.resolve();
    }
    dispatch({type: CustomerSelectedPlaceActionTypes.FETCH_SELECTED_PLACE_REQUEST});

    return geocodeReverse(lat, lon)
      .then((place) =>
        dispatch({
          type: CustomerSelectedPlaceActionTypes.FETCH_SELECTED_PLACE_SUCCESS,
          payload: place[0] ?? null, // It is not safe to assume there is one
        }),
      )
      .catch((error) =>
        dispatch({
          type: CustomerSelectedPlaceActionTypes.FETCH_SELECTED_PLACE_ERROR,
        }),
      );
  };
}
