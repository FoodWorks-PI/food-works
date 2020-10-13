// @flow strict

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Button from 'components/shared/Button.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import TextInput from 'components/shared/TextInput.react';

const useStyles = makeStyles({
  root: {
    padding: 32,
  },
  button: {
    width: '100%',
    marginTop: 12,
  },
  title: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  subtitle: {
    marginBottom: 16,
  },
  field: {
    marginBottom: 12,
  },
});

export default function UserNameStep(): Node {
  const classes = useStyles();
  function handleFacebookLogin() {
    // TODO: Talk to auth API
  }

  return (
    <FlexLayout className={classes.root} direction="vertical">
      <Typography className={classes.title} color="primary" variant="h4" align="center">
        FOOD WORKS
      </Typography>
      <Typography className={classes.subtitle}>Datos de usuario</Typography>
      <TextInput className={classes.field} label="Nombre" placeholder="Nombres" />
      <TextInput className={classes.field} label="Apellido" placeholder="Apellidos" />
      <TextInput
        className={classes.field}
        label="Teléfono"
        placeholder="10 digitos"
        type="tel"
      />
      <Button className={classes.button} onClick={handleFacebookLogin}>
        Continuar
      </Button>
    </FlexLayout>
  );
}
