// @flow strict

import React from 'react';
import type {Node} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

import fbLogo from 'assets/facebook/f_logo_RGB-White_58.png';

const useStyles = makeStyles({
  root: {
    background: 'none',
    backgroundColor: '#1877F2',
    color: '#fff',
    lineHeight: 1,
    border: 'none',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    padding: 8,
  },
  logo: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'start',
  },
});

type Props = {
  onClick: (e: SyntheticMouseEvent<>) => mixed,
  className?: string,
};

function FacebookLoginButton(props: Props): Node {
  const classes = useStyles();
  return (
    <button className={clsx(classes.root, props.className)} onClick={props.onClick}>
      <img className={classes.logo} src={fbLogo} alt="Facebook Logo" />
      <span className={classes.text}>Continua con Facebook</span>
    </button>
  );
}

export default FacebookLoginButton;
