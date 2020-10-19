// @flow

import type {PlacePrediction} from 'constants/GoogleAPITypes';

import * as React from 'react';
import {useState, useCallback, useMemo} from 'react';
import debounce from 'utils/debounce';
import TextInput from 'components/shared/TextInput.react';
import {searchAutocomplete} from 'services/GoogleAPI';
import {v4 as uuidv4} from 'uuid';

type Props = $ReadOnly<{
  onSearchResults: (predictions: Array<PlacePrediction>, sessiontoken: string) => mixed,
  onSearchError: (error: any) => mixed,
}>;

export default function PlacesAutocompleteSearch({
  onSearchResults,
  onSearchError,
}: Props): React.Node {
  const [value, setValue] = useState('');

  const handleSearch = useCallback(
    (q: string) => {
      const sessiontoken = uuidv4();
      searchAutocomplete(q, sessiontoken)
        .then((predictions) => onSearchResults(predictions, sessiontoken))
        .catch((error) => onSearchError(error));
    },
    [onSearchError, onSearchResults],
  );

  // Not sure if this is the best way
  const debounced = useMemo(() => debounce(handleSearch, 300), [handleSearch]);

  const onChange = (e) => {
    setValue(e.target.value); // Mainly for displaying to the user
    debounced(e.target.value);
  };

  return <TextInput label="Busca un lugar" value={value} onChange={onChange} />;
}
