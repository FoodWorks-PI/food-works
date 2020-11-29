// @flow strict

import type {Node} from 'react';

import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

import FlexLayout from 'components/shared/FlexLayout.react';
import {Typography, IconButton} from '@material-ui/core';
import AccountEditDialog from './AccountEditDialog.react';
import {ArrowBack} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowY: 'scroll',
    whiteSpace: 'nowrap',
    marginBottom: '15%',
    padding: '8px',
  },
  fullWidth: {
    width: '100%',
  },
  title: {
    flexGrow: 3,
  },
});

const initialState = {
  name: 'Juan',
  lastName: 'Lopez',
  email: 'juan_per@gmail.com',
  phone: '55 78471 80',
};

function AccountDetails(): Node {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [editField, setField] = useState<string>('');
  const [userData] = useState(initialState);
  const history = useHistory();

  function openDialog(fieldName: string) {
    setField(fieldName);
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }
  function goBack() {
    history.goBack();
  }

  return (
    <FlexLayout direction="vertical" className={classes.root} align="center">
      <FlexLayout justify="center" align="baseline" className={classes.fullWidth}>
        <IconButton aria-label="back" color="primary" size="medium" onClick={goBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" gutterBottom align="center" className={classes.title}>
          Editar mi cuenta
        </Typography>
      </FlexLayout>
      <FlexLayout direction="vertical" className={classes.fullWidth}>
        <Typography variant="subtitle2">Nombre</Typography>
        <Typography
          variant="h6"
          gutterBottom
          onClick={() => openDialog('name')}
          className={classes.fullWidth}
        >
          {userData.name}
        </Typography>
        <Typography variant="subtitle2">Apellido</Typography>
        <Typography
          variant="h6"
          gutterBottom
          onClick={() => openDialog('lastName')}
          className={classes.fullWidth}
        >
          {userData.lastName}
        </Typography>
        <FlexLayout justify="between" align="center" className={classes.fullWidth}>
          <Typography variant="subtitle2">Correo electrónico</Typography>
          <Typography color="error" variant="caption">
            No verificado
          </Typography>
        </FlexLayout>
        <Typography
          variant="h6"
          gutterBottom
          onClick={() => openDialog('email')}
          className={classes.fullWidth}
        >
          {userData.email}
        </Typography>
        <Typography variant="subtitle2">Telefono</Typography>
        <Typography
          variant="h6"
          gutterBottom
          onClick={() => openDialog('phone')}
          className={classes.fullWidth}
        >
          {userData.phone}
        </Typography>
      </FlexLayout>
      <AccountEditDialog
        open={open}
        setOpen={closeDialog}
        field={editField}
        data={userData[editField]}
      />
    </FlexLayout>
  );
}

export default AccountDetails;
