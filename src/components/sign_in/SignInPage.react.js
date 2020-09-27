// @flow strict

import React from 'react';
import type {Node} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import FacebookLoginButton from 'components/shared/FacebookLoginButton.react';
import Button from 'components/shared/Button.react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: '70%',
  },
});

function SignInPage(): Node {
  const classes = useStyles();
  function handleFacebookLogin() {
    // TODO: Talk to auth API
  }

  return (
    <div className={classes.root}>
      <Button className={classes.button} onClick={handleFacebookLogin}>
        INGRESAR
      </Button>
      <FacebookLoginButton className={classes.button} onClick={handleFacebookLogin} />
    </div>
  );
}

export default SignInPage;
