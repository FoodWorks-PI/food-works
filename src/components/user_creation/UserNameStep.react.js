// @flow strict

import React from 'react';
import type {Node} from 'react';
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
  },
  title: {
    alignSelf: 'center',
    marginBottom: 24,
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
      <Typography>Ingresa tu nombre</Typography>
      <TextInput label="Nombre" placeholder="Nombres" />
      <TextInput label="Apellido" placeholder="Apellidos" />
      <Button className={classes.button} onClick={handleFacebookLogin}>
        Continuar
      </Button>
    </FlexLayout>
  );
}
