// @flow strict

type Code =
  | 'OK'
  | 'ZERO_RESULTS'
  | 'OVER_QUERY_LIMIT'
  | 'REQUEST_DENIED'
  | 'INVALID_REQUEST'
  | 'UNKNOWN_ERROR';

export default class GoogleAPIError extends Error {
  code: Code;
  constructor(code: Code, message: string) {
    super(message);
    this.code = code;
  }
}
