// @flow strict

import type {Node} from 'react';

import React, {forwardRef} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
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
        return 'Nombre';
      case 'lastName':
        return 'Apellido';
      case 'email':
        return 'Correo electrónico';
      case 'phone':
        return 'Número de telefono';
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
    >
      <DialogTitle id="dialog-edit-account">Editar datos</DialogTitle>
      <DialogContent>
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
