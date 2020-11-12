// @flow strict

import type {Node} from 'react';

import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Paper, Tabs, Tab, AppBar} from '@material-ui/core';

import FlexLayout from 'components/shared/FlexLayout.react';
import OrdersPanel from 'components/orders/OrdersPanel.react';

import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '8px',
    marginBottom: '15%',
  },
  fullWidth: {
    width: '100%',
  },
});

const orders = [
  {id: 0, state: 'Activo', product: 'Tacos', quantity: 2, restaurant: 'TACOS'},
  {id: 1, state: 'Activo', product: 'Tacos', quantity: 2, restaurant: 'TACOS'},
  {id: 2, state: 'Activo', product: 'Tacos', quantity: 2, restaurant: 'TACOS'},
];

function OrdersPage(): Node {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  function handleTabChange(e, newValue) {
    setValue(newValue);
  }
  function handleIndexChange(index) {
    setValue(index);
  }

  return (
    <>
      <AppBar position="static">
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="secondary"
            onChange={handleTabChange}
            aria-label="order-tabs"
            variant="fullWidth"
          >
            <Tab label="Activas" disableRipple />
            <Tab label="Pasadas" disableRipple />
          </Tabs>
        </Paper>
      </AppBar>
      <FlexLayout className={classes.root}>
        <SwipeableViews
          enableMouseEvents
          index={value}
          onChangeIndex={handleIndexChange}
          className={classes.fullWidth}
        >
          <OrdersPanel value={value} index={0} orders={orders} />
          <OrdersPanel value={value} index={1} orders={[]} />
        </SwipeableViews>
      </FlexLayout>
    </>
  );
}

export default OrdersPage;
