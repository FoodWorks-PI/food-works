// @flow strict

import type {PlaceDetailed, PlacePrediction} from 'constants/GoogleAPITypes';

import GoogleAPIError from 'utils/GoogleAPIError';

const BASE_URL = 'http://blackholes.herokuapp.com';

function getGoogleAPI<T>(url: URL): Promise<T> {
  return fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      }
      return response.json();
    })
    .catch((response: Response) =>
      response
        .json()
        .then((json) => {
          throw new GoogleAPIError(json.error.code, json.error.message);
        })
        .catch(() => {
          throw new GoogleAPIError('UNKNOWN_ERROR', 'Unknown error');
        }),
    );
}

export function searchAutocomplete(
  input: string,
  sessiontoken: string,
): Promise<Array<PlacePrediction>> {
  const fetchUrl = new URL(`${BASE_URL}/place/autocomplete`);
  fetchUrl.searchParams.append('input', input);
  fetchUrl.searchParams.append('sessiontoken', sessiontoken);
  fetchUrl.searchParams.append('components', 'country:mx');
  return getGoogleAPI<Array<PlacePrediction>>(fetchUrl);
}

export function placeDetails(
  placeId: string,
  sessiontoken: string,
): Promise<PlaceDetailed> {
  const fetchUrl = new URL(`${BASE_URL}/place/details`);
  fetchUrl.searchParams.append('place_id', placeId);
  fetchUrl.searchParams.append('sessiontoken', sessiontoken);
  return getGoogleAPI<PlaceDetailed>(fetchUrl);
}

export function geocodeReverse(lat: string, lon: string): Promise<Array<PlaceDetailed>> {
  const fetchUrl = new URL(`${BASE_URL}/goecode/reverse`);
  fetchUrl.searchParams.append('lat', lat);
  fetchUrl.searchParams.append('lon', lon);
  return getGoogleAPI<Array<PlaceDetailed>>(fetchUrl);
}
