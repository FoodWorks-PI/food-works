// @flow strict

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

import {
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@material-ui/core';
import FlexLayout from 'components/shared/FlexLayout.react';
import {
  ArrowBack,
  CreditCardOutlined,
  ChevronRight,
  AddOutlined,
} from '@material-ui/icons';
import {Link} from 'react-router-dom';

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
  list: {
    width: '100%',
    marginTop: '5%',
  },
});

function AccountPayments(): Node {
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
          Métodos de Pago
        </Typography>
      </FlexLayout>
      <List className={classes.list}>
        <ListItem button to="/customer/account/payments/my-card" component={Link}>
          <ListItemIcon>
            <CreditCardOutlined />
          </ListItemIcon>
          <ListItemText primary="Tarjeta 1" />
          <ListItemSecondaryAction>
            <ChevronRight />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem button to="/customer/account/payments/add" component={Link}>
          <ListItemIcon>
            <AddOutlined />
          </ListItemIcon>
          <ListItemText primary="Agregar tarjeta" />
          <ListItemSecondaryAction>
            <ChevronRight />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </FlexLayout>
  );
}

export default AccountPayments;
