// @flow strict

import type {Node} from 'react';

import React from 'react';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {RestaurantMenu} from '@material-ui/icons';

import FlexLayout from 'components/shared/FlexLayout.react';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '50vh',
  },
  icon: {
    fontSize: 64,
  },
});

type Props = {
  children: Node,
};

function OrdersNotice({children}: Props): Node {
  const classes = useStyles();

  return (
    <FlexLayout
      direction="vertical"
      justify="center"
      align="center"
      className={classes.root}
    >
      <RestaurantMenu className={classes.icon} color="primary" />
      <Typography variant="h4">{children}</Typography>
    </FlexLayout>
  );
}

export default OrdersNotice;
