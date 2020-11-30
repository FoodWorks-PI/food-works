// @flow strict

import type {Restaurant} from 'constants/FeedTypes';

import * as React from 'react';
import {List, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import SearchRestaurantCard from 'components/search/SearchRestaurantCard.react';

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
  },
  card: {
    margin: '3px 0',
  },
  description: {
    maxWidth: '80%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

type Props = {
  restaurants: Restaurant[],
};

function SearchRestaurantsList({restaurants}: Props): React.Node {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" color="primary">
        Restaurantes
      </Typography>
      {restaurants.length === 0 && (
        <Typography variant="subtitle2">No se encontraron resultados</Typography>
      )}
      <List className={classes.fullWidth}>
        {restaurants.map((restaurant) => (
          <SearchRestaurantCard restaurant={restaurant} />
        ))}
      </List>
    </>
  );
}

export default SearchRestaurantsList;
