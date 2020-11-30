// @flow strict

import type {Node} from 'react';
import type {Product} from 'constants/FeedTypes';

import React from 'react';
import {Typography, ListItem, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import FlexLayout from 'components/shared/FlexLayout.react';

import nullthrows from 'utils/nullthrows';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
  },
  card: {
    margin: '3px 0',
  },
  name: {
    maxWidth: '80%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

type Props = {
  product: Product,
};

function SearchProductCard({product}: Props): Node {
  const classes = useStyles();
  const history = useHistory();

  function handleClick() {
    history.push(`/customer/protected/products/${product.ID}`);
  }

  return (
    <Paper elevation={3} className={classes.card} onClick={handleClick}>
      <ListItem>
        <FlexLayout direction="vertical" className={classes.fullWidth}>
          <Typography variant="body1" className={classes.name}>
            {product.name}
          </Typography>
          <Typography variant="subtitle2">
            <strong>${nullthrows(product.cost) / 100}</strong>
          </Typography>
        </FlexLayout>
      </ListItem>
    </Paper>
  );
}

export default SearchProductCard;
