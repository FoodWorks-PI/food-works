// @flow strict

import type {Node} from 'react';
import type {Restaurant} from 'constants/FeedTypes';

import React from 'react';
import {Typography, ListItem, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import FlexLayout from 'components/shared/FlexLayout.react';
import {useHistory} from 'react-router-dom';

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
  restaurant: Restaurant,
};

function SearchRestaurantCard({restaurant}: Props): Node {
  const classes = useStyles();
  const history = useHistory();

  function handleClick() {
    history.push(`/customer/protected/restaurants/${restaurant.ID}`);
  }

  return (
    <Paper key={restaurant.ID} className={classes.card} onClick={handleClick}>
      <ListItem>
        <FlexLayout direction="vertical" className={classes.fullWidth}>
          <Typography variant="h6">{restaurant.name}</Typography>
          <Typography variant="body2" className={classes.description}>
            {restaurant.description}
          </Typography>
        </FlexLayout>
      </ListItem>
    </Paper>
  );
}

export default SearchRestaurantCard;
