// @flow strict

import type {Node} from 'react';

import React, {forwardRef, useState} from 'react';

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

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    margin: '0 !important',
    width: '100%',
    height: '45%',
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
  closeDialog: (e: SyntheticMouseEvent<>) => mixed,
};

function ReservationDialog({open, closeDialog}: Props): Node {
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
      onClose={closeDialog}
      classes={{
        paper: classes.root,
      }}
      aria-labelledby="dialog-buy-product"
    >
      <DialogTitle id="dialog-buy-product" className={classes.title}>
        Donas Surtidas
      </DialogTitle>
      <Typography variant="subtitle2" align="center">
        Donas de Pedro
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
          <Typography variant="subtitle1">Total: ${quantity * 75}MXN</Typography>
        </FlexLayout>
      </DialogContent>
      <DialogActions style={{justifyContent: 'center'}}>
        <Button onClick={closeDialog}>Comprar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReservationDialog;
