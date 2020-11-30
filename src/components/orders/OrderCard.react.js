// @flow strict

import type {Order, OrderState} from 'constants/FeedTypes';

import * as React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Paper, Typography, Chip} from '@material-ui/core';
import {InfoOutlined} from '@material-ui/icons';
import FlexLayout from 'components/shared/FlexLayout.react';
import Button from 'components/shared/Button.react';
import nullthrows from 'utils/nullthrows';
import donuts from 'assets/donuts.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '8px 0',
  },
  img: (props: Props) => {
    let productImage = nullthrows(props.order.product?.image);
    productImage = productImage !== '' ? productImage : donuts;
    return {
      width: '100%',
      height: '120px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${productImage})`,
    };
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    padding: '0 3px 0 0',
  },
  content: {
    padding: 8,
    width: '100%',
  },
  icon: {
    margin: '0 5px 0 0',
  },
  row: {
    marginBottom: 10,
    width: '100%',
  },
  button: {
    fontSize: 12,
  },
  buttonCancel: {
    backgroundColor: theme.palette.error.main,
    fontSize: 12,
  },
  fullWidth: {
    width: '100%',
  },
}));

type Props = {
  order: Order,
  onCancel: (id: number) => void,
  onRate: (order: Order) => void,
};

const stateToName: {[OrderState]: string} = {
  COMPLETED: 'Completado',
  PAID: 'Pagado',
  PENDING_PAYMENT: 'Pago pendiente',
  CANCELLED: 'Cancelado',
  ERROR: 'Error',
};

function OrderCard({order, onCancel, onRate}: Props): React.Node {
  const classes = useStyles({order});

  return (
    <Paper className={classes.root} square elevation={3}>
      <FlexLayout direction="vertical">
        <FlexLayout
          direction="vertical"
          justify="center"
          align="center"
          className={classes.img}
        >
          <Typography variant="h5" className={classes.title}>
            {nullthrows(order.product?.restaurant?.name)}
          </Typography>
        </FlexLayout>
        <FlexLayout direction="vertical" className={classes.content}>
          <FlexLayout align="center" className={classes.row}>
            <InfoOutlined className={classes.icon} />
            <Typography variant="h6">
              {stateToName[nullthrows(order.orderState)]}
            </Typography>
          </FlexLayout>
          <FlexLayout align="center" className={classes.row}>
            <Chip
              label={order.quantity}
              variant="outlined"
              color="primary"
              size="small"
              className={classes.icon}
            />
            <Typography variant="body1">{nullthrows(order.product?.name)}</Typography>
          </FlexLayout>
          <FlexLayout align="center" className={classes.fullWidth} justify="between">
            <Typography variant="body2">
              Total: ${nullthrows(order.product?.cost) * nullthrows(order.quantity)}
            </Typography>
            {order.orderState === 'PENDING_PAYMENT' || order.orderState === 'PAID' ? (
              <Button
                className={classes.buttonCancel}
                onClick={() => onCancel(order.ID)}
              >
                Cancelar
              </Button>
            ) : null}
            {order.orderState === 'COMPLETED' && (
              <Button className={classes.button} onClick={() => onRate(order)}>
                Calificar
              </Button>
            )}
          </FlexLayout>
        </FlexLayout>
      </FlexLayout>
    </Paper>
  );
}

export default OrderCard;
