// @flow strict

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import TextLink from 'components/shared/TextLink.react';
import AccountList from 'components/account/AccountList.react';

import {Typography} from '@material-ui/core';

import {gql, useQuery} from '@apollo/client';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowY: 'scroll',
    whiteSpace: 'nowrap',
    padding: '8px 0 8px 0',
    marginBottom: '15%',
  },
});

const GET_CURRENT_CUSTOMER_NAME = gql`
  query GetCurrentCustomer {
    getCurrentCustomer {
      name
    }
  }
`;

function AccountPage(): Node {
  const classes = useStyles();
  const {data, loading, error} = useQuery(GET_CURRENT_CUSTOMER_NAME);

  if (loading) return 'Cargando...';
  if (error) return 'Error...';

  return (
    <FlexLayout direction="vertical" className={classes.root} align="center">
      <Typography variant="h4" gutterBottom align="center">
        {data.getCurrentCustomer.name}
      </Typography>
      <TextLink to="/customer/protected/account/profile">Editar mi cuenta</TextLink>
      <AccountList />
    </FlexLayout>
  );
}

export default AccountPage;
