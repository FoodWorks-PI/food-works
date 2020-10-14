// @flow strict

import type GoogleAPIError from 'utils/GoogleAPIError';
import type {PlaceDetailed} from 'constants/GoogleAPITypes';

import keyMirror from 'utils/keyMirror';

const ActionTypes = keyMirror({
  FETCH_SELECTED_PLACE_ERROR: null,
  FETCH_SELECTED_PLACE_REQUEST: null,
  FETCH_SELECTED_PLACE_SUCCESS: null,
});

export type CustomerSelectedPlaceAction = $ReadOnly<
  | {
      type: typeof ActionTypes.FETCH_SELECTED_PLACE_REQUEST,
    }
  | {
      type: typeof ActionTypes.FETCH_SELECTED_PLACE_ERROR,
      payload: GoogleAPIError,
    }
  | {
      type: typeof ActionTypes.FETCH_SELECTED_PLACE_SUCCESS,
      payload: PlaceDetailed,
    },
>;

export default ActionTypes;
