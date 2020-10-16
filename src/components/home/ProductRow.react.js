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
    height: '33%',
    overflowX: 'auto',
    padding: '5px 0 5px 0',
    margin: '10px 0 10px 0',
    whiteSpace: 'nowrap',
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
      <Typography variant="h5" className={classes.title}>
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
