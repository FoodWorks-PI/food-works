// @flow strict

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

import {Typography, IconButton} from '@material-ui/core';
import FlexLayout from 'components/shared/FlexLayout.react';
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

function AccountFavorites(): Node {
  const classes = useStyles();
  const history = useHistory();

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
          Mis Favoritos
        </Typography>
      </FlexLayout>
      <Typography variant="subtitle1" align="center">
        No tienes favoritos :(
      </Typography>
    </FlexLayout>
  );
}

export default AccountFavorites;
