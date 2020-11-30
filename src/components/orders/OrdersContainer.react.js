// @flow strict

import type {Order} from 'constants/FeedTypes';

import * as React from 'react';
import {useCallback, useState} from 'react';
import {gql, useQuery, useMutation} from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import OrdersPanel from 'components/orders/OrdersPanel.react';
import RatingDialog from 'components/orders/RatingDialog.react';
import useBoolean from 'hooks/useBoolean';

const GET_ORDERS = gql`
  query GetOrders {
    getCustomerOrders {
      ID
      product {
        ID
        name
        image
        cost
        restaurant {
          name
        }
      }
      quantity
      orderState
    }
  }
`;

const CHANGE_ORDER_STATE = gql`
  mutation ChangeOrderState($input: UpdateOrderInput!) {
    updateOrder(input: $input)
  }
`;

const CREATE_RATING = gql`
  mutation CreateRating($input: RegisterRatingInput!) {
    createProductRating(input: $input)
  }
`;

export default function OrdersContainer(): React.Node {
  const {data, loading, error, refetch} = useQuery(GET_ORDERS);
  const {value: open, setTrue, setFalse} = useBoolean(false);
  const [selectedOrder, setSelectedOrder] = useState<?Order>(null);
  const [updateOrder] = useMutation(CHANGE_ORDER_STATE, {
    onCompleted() {
      refetch();
    },
  });
  const [createRating] = useMutation(CREATE_RATING, {
    onCompleted() {
      refetch();
    },
    onError() {},
  });
  const onCancel = useCallback(
    (id) => {
      updateOrder({
        variables: {
          input: {
            orderID: id,
            orderState: 'CANCELLED',
          },
        },
      });
    },
    [updateOrder],
  );
  const onRate = useCallback(
    (order) => {
      setSelectedOrder(order);
      setTrue();
    },
    [setSelectedOrder, setTrue],
  );

  const onSendRate = useCallback(
    (productId, rating, comment) => {
      setFalse();
      createRating({
        variables: {
          input: {
            productID: productId,
            rating,
            comment,
          },
        },
      });
    },
    [createRating, setFalse],
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!loading && error != null) {
    return <Typography>Error...</Typography>;
  }

  const orders = data.getCustomerOrders;
  return (
    <>
      <OrdersPanel orders={orders} onCancel={onCancel} onRate={onRate} />
      <RatingDialog
        onClose={setFalse}
        open={open}
        order={selectedOrder}
        onRate={onSendRate}
      />
    </>
  );
}
