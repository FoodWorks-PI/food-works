// @flow strict

import type {Order} from 'constants/FeedTypes';

import * as React from 'react';
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

type Props = {
  orders: Array<Order>,
  onCancel: (id: number) => void,
  onRate: (order: Order) => void,
};

function OrdersPanel({orders, onCancel, onRate}: Props): React.Node {
  const classes = useStyles();
  if (orders.length === 0) {
    return <OrdersNotice> No tienes ordenes</OrdersNotice>;
  }
  return (
    <FlexLayout className={classes.root} direction="vertical">
      {orders.map((order) => (
        <OrderCard order={order} key={order.ID} onCancel={onCancel} onRate={onRate} />
      ))}
    </FlexLayout>
  );
}

export default OrdersPanel;
