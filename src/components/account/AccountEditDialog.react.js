// @flow strict

import type {Node} from 'react';

import React, {forwardRef, useState} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TextInput from 'components/shared/TextInput.react';
import Button from 'components/shared/Button.react';

const useStyles = makeStyles({
  cancelBtn: {
    backgroundColor: '#ccc',
  },
});

type Customer = {
  name: string,
  lastName: string,
  phone: string,
  email: string,
};

type Props = {
  open: boolean,
  currentCustomer: Customer,
  editCustomer: (customer: Customer) => void,
  setOpen: (e: SyntheticMouseEvent<>) => mixed,
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AccountEditDialog({open, setOpen, currentCustomer, editCustomer}: Props): Node {
  const [customer, setCustomer] = useState(currentCustomer);
  const classes = useStyles();

  function handleSubmit() {
    const valid = Object.values(customer).every((v) => v !== '');
    if (valid) {
      editCustomer(customer);
    }
  }
  function handleChange(e: SyntheticInputEvent<>) {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={setOpen}
      aria-labelledby="dialog-edit-account"
    >
      <DialogTitle id="dialog-edit-account">Editar datos</DialogTitle>
      <DialogContent>
        <TextInput
          value={customer.name}
          name="name"
          label="Nombre"
          onChange={handleChange}
        />
        <TextInput
          value={customer.lastName}
          name="lastName"
          label="Apellido"
          onChange={handleChange}
        />
        <TextInput
          value={customer.phone}
          name="phone"
          label="Telefono"
          onChange={handleChange}
        />
        <TextInput
          value={customer.email}
          name="email"
          label="Correo Electronico"
          readOnly
        />
      </DialogContent>
      <DialogActions style={{justifyContent: 'center'}}>
        <Button onClick={handleSubmit}>Actualizar</Button>
        <Button onClick={setOpen} className={classes.cancelBtn}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AccountEditDialog;
