// @flow strict

import type {Node} from 'react';

import React, {forwardRef} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from '@material-ui/core';
import TextInput from 'components/shared/TextInput.react';
import Button from 'components/shared/Button.react';

type Props = {
  open: boolean,
  field: string,
  data: string,
  setOpen: (e: SyntheticMouseEvent<>) => mixed,
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AccountEditDialog({open, setOpen, field, data}: Props): Node {
  function getFieldDescription() {
    switch (field) {
      case 'name':
        return 'nombre';
      case 'lastName':
        return 'apellido';
      case 'email':
        return 'correo electrónico';
      case 'phone':
        return 'número de telefono';
      default:
        return 'dato';
    }
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={setOpen}
      aria-labelledby="dialog-edit-account"
      aria-describedby="dialog-edit-account-description"
    >
      <DialogTitle id="dialog-edit-account">Editar datos</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-edit-account-description">
          Ingresa un nuevo {getFieldDescription()}
        </DialogContentText>
        <TextInput placeholder={data} name={field} label={getFieldDescription()} />
      </DialogContent>
      <DialogActions style={{justifyContent: 'center'}}>
        <Button onClick={setOpen}>Actualizar</Button>
        <Button onClick={setOpen}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AccountEditDialog;
