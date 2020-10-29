// @flow

import type {PlacePrediction} from 'constants/GoogleAPITypes';

import * as React from 'react';
import {useState, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import FlexLayout from 'components/shared/FlexLayout.react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PlacesAutocompleteSearch from 'components/places/PlacesAutocompleteSearch.react';
import {loadPlaceFromDetails} from 'actions/CustomerSelectedPlaceActions';
import {useDispatch} from 'stores/hooks/CustomerStoreHooks';

const useStyles = makeStyles({
  top: {
    width: '100%',
    padding: 16,
  },
  list: {
    width: '100%',
  },
});

export default function PlacesAutocompletePage(): React.Node {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [predictions, setPredictions] = useState<Array<PlacePrediction>>([]);
  const [sessiontoken, setSessiontoken] = useState<?string>(null);

  // TODO: Handle this
  function handleSearchError(error) {}

  function handleSearchResults(results, sessiontoken) {
    setPredictions(results);
    setSessiontoken(sessiontoken);
  }

  const onSelectPlace = useCallback(
    (place_id) => {
      if (sessiontoken) {
        dispatch(loadPlaceFromDetails(place_id, sessiontoken));
        // Not desirable, but way easier
        history.goBack();
      }
    },
    [dispatch, sessiontoken, history],
  );

  return (
    <FlexLayout direction="vertical">
      <Paper className={classes.top} square elevation={4}>
        <PlacesAutocompleteSearch
          onSearchError={handleSearchError}
          onSearchResults={handleSearchResults}
        />
      </Paper>
      <List className={classes.list}>
        {predictions.map((prediction) => (
          <ListItem
            button
            key={prediction.place_id}
            onClick={() => onSelectPlace(prediction.place_id)}
          >
            <ListItemText
              primary={
                prediction.structured_formatting?.main_text ?? prediction.description
              }
              secondary={prediction.structured_formatting?.secondary_text ?? null}
            />
          </ListItem>
        ))}
      </List>
    </FlexLayout>
  );
}
