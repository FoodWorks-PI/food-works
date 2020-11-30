// @flow strict

import type {Product} from 'constants/FeedTypes';

import * as React from 'react';
import {forwardRef, useState} from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Button from 'components/shared/Button.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import nullthrows from 'utils/nullthrows';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    margin: '0 !important',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    width: '100%',
    padding: '8px 24px !important',
  },
  quantityButton: {
    borderRadius: '50%',
    fontSize: 18,
    margin: '0 20px',
  },
  quantityRow: {
    marginBottom: 5,
  },
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean,
  onClose: (e: SyntheticMouseEvent<>, quantity?: number) => mixed,
  product: Product,
};

export default function ReservationDialog({open, onClose, product}: Props): React.Node {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);

  function addQuantity() {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  }
  function substractQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      fullWidth
      onClose={onClose}
      classes={{
        paper: classes.root,
      }}
      aria-labelledby="dialog-buy-product"
    >
      <DialogTitle id="dialog-buy-product" className={classes.title}>
        {nullthrows(product.name)}
      </DialogTitle>
      <Typography variant="subtitle2" align="center">
        {nullthrows(product.restaurant?.name)}
      </Typography>
      <DialogContent>
        <FlexLayout direction="vertical" align="center">
          <Typography variant="subtitle1">
            <strong>Cantidad</strong>
          </Typography>
          <FlexLayout align="center" className={classes.quantityRow}>
            <Button onClick={substractQuantity} className={classes.quantityButton}>
              -
            </Button>
            <Typography variant="h5">{quantity}</Typography>
            <Button onClick={addQuantity} className={classes.quantityButton}>
              +
            </Button>
          </FlexLayout>
          <Typography variant="subtitle1">
            Total: ${quantity * nullthrows(product.cost)}MXN
          </Typography>
        </FlexLayout>
      </DialogContent>
      <DialogActions style={{justifyContent: 'center'}}>
        <Button onClick={(e) => onClose(e, quantity)}>Pagar</Button>
      </DialogActions>
    </Dialog>
  );
}
