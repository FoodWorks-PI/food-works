// @flow strict

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import OrderCard from 'components/orders/OrderCard.react';
import OrdersNotice from 'components/orders/OrdersNotice.react';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowY: 'scroll',
    whiteSpace: 'nowrap',
  },
});

type Order = {
  id: number,
  state: string,
  product: string,
  quantity: number,
  restaurant: string,
};

type Props = {
  value: number,
  index: number,
  orders: Order[],
};

function OrdersActivePanel({value, index, orders}: Props): Node {
  const classes = useStyles();
  if (orders.length === 0) {
    return <OrdersNotice> No tienes ordenes</OrdersNotice>;
  }
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <FlexLayout className={classes.root} direction="vertical">
          {orders.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </FlexLayout>
      )}
    </div>
  );
}

export default OrdersActivePanel;
