// @flow strict

import type {Node} from 'react';

import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Paper, Typography, Chip} from '@material-ui/core';
import {InfoOutlined} from '@material-ui/icons';

import FlexLayout from 'components/shared/FlexLayout.react';
import Button from 'components/shared/Button.react';

import donuts from 'assets/donuts.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '8px 0',
  },
  img: {
    width: '100%',
    height: '120px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${donuts})`,
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
    backgroundColor: theme.palette.error.main,
    fontSize: 12,
  },
  fullWidth: {
    width: '100%',
  },
}));

type Order = {
  id: number,
  state: string,
  product: string,
  quantity: number,
  restaurant: string,
};

type Props = {
  order: Order,
};

function OrderCard({order}: Props): Node {
  const classes = useStyles();

  function handleCancel() {
    console.log('cancel');
  }

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
            {order.restaurant}
          </Typography>
        </FlexLayout>
        <FlexLayout direction="vertical" className={classes.content}>
          <FlexLayout align="center" className={classes.row}>
            <InfoOutlined className={classes.icon} />
            <Typography variant="h6">{order.state}</Typography>
          </FlexLayout>
          <FlexLayout align="center" className={classes.row}>
            <Chip
              label={order.quantity}
              variant="outlined"
              color="primary"
              size="small"
              className={classes.icon}
            />
            <Typography variant="body1">{order.product}</Typography>
          </FlexLayout>
          <FlexLayout align="center" className={classes.fullWidth} justify="between">
            <Typography variant="h6">TOTAL: $50</Typography>
            <Button className={classes.button} onClick={handleCancel}>
              Cancelar
            </Button>
          </FlexLayout>
        </FlexLayout>
      </FlexLayout>
    </Paper>
  );
}

export default OrderCard;
