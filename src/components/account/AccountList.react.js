// @flow strict

import type {Node} from 'react';

import React from 'react';
import {
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Favorite, Help, Payment, Settings, ChevronRight} from '@material-ui/icons';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '5%',
  },
});

function AccountList(): Node {
  const classes = useStyles();

  return (
    <List className={classes.root} component="nav">
      <ListItem button to="/customer/account/favorites" component={Link}>
        <ListItemIcon>
          <Favorite />
        </ListItemIcon>
        <ListItemText primary="Favoritos" />
        <ListItemSecondaryAction>
          <ChevronRight />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem button divider to="/customer/account/payments" component={Link}>
        <ListItemIcon>
          <Payment />
        </ListItemIcon>
        <ListItemText primary="Pagos" />
        <ListItemSecondaryAction>
          <ChevronRight />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Help />
        </ListItemIcon>
        <ListItemText primary="Ayuda" />
        <ListItemSecondaryAction>
          <ChevronRight />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Ajustes" />
        <ListItemSecondaryAction>
          <ChevronRight />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

export default AccountList;
