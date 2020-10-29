// @flow strict

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import TextLink from 'components/shared/TextLink.react';
import AccountList from 'components/account/AccountList.react';

import {Typography} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowY: 'scroll',
    whiteSpace: 'nowrap',
    padding: '8px 0 8px 0',
    marginBottom: '15%',
  },
});

function AccountPage(): Node {
  const classes = useStyles();

  return (
    <FlexLayout direction="vertical" className={classes.root} align="center">
      <Typography variant="h4" gutterBottom align="center">
        Juan Perez
      </Typography>
      <TextLink to="/customer/account/profile">Editar mi cuenta</TextLink>
      <AccountList />
    </FlexLayout>
  );
}

export default AccountPage;
