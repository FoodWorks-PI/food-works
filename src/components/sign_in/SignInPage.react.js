// @flow strict

import React from 'react';
import type {Node} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Button from 'components/shared/Button.react';
import FlexLayout from 'components/shared/FlexLayout.react';

const useStyles = makeStyles({
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
    <FlexLayout>
      <Button className={classes.button} onClick={handleFacebookLogin}>
        Ingresar
      </Button>
    </FlexLayout>
  );
}

export default SignInPage;
