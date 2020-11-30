// @flow strict

import type {Node} from 'react';
import type {Product} from 'constants/FeedTypes';

import React from 'react';
import {List, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import SearchProductCard from 'components/search/SearchProductCard.react';

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
  },
});

type Props = {
  products: Product[],
};

function SearchProductsList({products}: Props): Node {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" color="primary">
        Productos
      </Typography>
      {products.length === 0 && (
        <Typography variant="subtitle2">No se encontraron resultados</Typography>
      )}
      <List className={classes.fullWidth}>
        {products.map((product) => (
          <SearchProductCard product={product} key={product.ID} />
        ))}
      </List>
    </>
  );
}

export default SearchProductsList;
