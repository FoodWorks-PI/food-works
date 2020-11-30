// @flow strict

import type {Node} from 'react';

import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import FlexLayout from 'components/shared/FlexLayout.react';
import ProductCard from 'components/shared/ProductCard.react';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginBottom: 8,
    whiteSpace: 'nowrap',
    padding: 4,
  },
});

type Product = {
  id: number,
  title: string,
  time: string,
  location: string,
  price: number,
  img: string,
  logo: string,
};

type Props = {
  productList: Product[],
  children: Node,
};

function ProductRow({productList, children}: Props): Node {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {children}
      </Typography>
      <FlexLayout direction="horizontal" align="center" className={classes.root}>
        {productList.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </FlexLayout>
    </>
  );
}

export default ProductRow;
