// @flow strict

import type {Node} from 'react';

import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

import FlexLayout from 'components/shared/FlexLayout.react';
import {Typography, IconButton} from '@material-ui/core';
import AccountEditDialog from './AccountEditDialog.react';
import {ArrowBack} from '@material-ui/icons';
import Button from 'components/shared/Button.react';

import {gql, useQuery, useMutation} from '@apollo/client';

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

type Customer = {
  name: string,
  lastName: string,
  phone: string,
  email: string,
};

const GET_CURRENT_CUSTOMER_PROFILE = gql`
  query GetCurrentCustomer {
    getCurrentCustomer {
      name
      lastName
      phone
      email
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateCustomerProfile($input: UpdateCustomerInput!) {
    updateCustomerProfile(input: $input)
  }
`;

function AccountDetails(): Node {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const history = useHistory();

  const {data, loading, error, refetch} = useQuery(GET_CURRENT_CUSTOMER_PROFILE);
  const [updateCustomer] = useMutation(UPDATE_PROFILE);

  if (loading) return 'Cargando...';
  if (error) return 'Error...';

  function openDialog() {
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }
  function goBack() {
    history.goBack();
  }
  function handleCustomerEdit(customer: Customer) {
    console.log(customer);
    updateCustomer({
      variables: {
        input: {
          name: customer.name,
          lastName: customer.lastName,
          phone: customer.phone,
        },
      },
    })
      .then((result) => {
        console.log(result);
        refetch();
        closeDialog();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const customer: Customer = data.getCurrentCustomer;
  return (
    <FlexLayout direction="vertical" className={classes.root} align="center">
      <FlexLayout justify="center" align="baseline" className={classes.fullWidth}>
        <IconButton aria-label="back" color="primary" size="medium" onClick={goBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" gutterBottom align="center" className={classes.title}>
          Editar mi cuenta
        </Typography>
      </FlexLayout>
      <FlexLayout direction="vertical" className={classes.fullWidth}>
        <Typography variant="subtitle2">Nombre</Typography>
        <Typography variant="h6" gutterBottom className={classes.fullWidth}>
          {customer.name}
        </Typography>
        <Typography variant="subtitle2">Apellido</Typography>
        <Typography variant="h6" gutterBottom className={classes.fullWidth}>
          {customer.lastName}
        </Typography>
        <FlexLayout justify="between" align="center" className={classes.fullWidth}>
          <Typography variant="subtitle2">Correo electrónico</Typography>
          <Typography color="error" variant="caption">
            No verificado
          </Typography>
        </FlexLayout>
        <Typography variant="h6" gutterBottom className={classes.fullWidth}>
          {customer.email}
        </Typography>
        <Typography variant="subtitle2">Telefono</Typography>
        <Typography variant="h6" gutterBottom className={classes.fullWidth}>
          {customer.phone}
        </Typography>
      </FlexLayout>
      <AccountEditDialog
        open={open}
        setOpen={closeDialog}
        currentCustomer={customer}
        editCustomer={handleCustomerEdit}
      />
      <Button onClick={openDialog}>Editar</Button>
    </FlexLayout>
  );
}

export default AccountDetails;
