// @flow strict

import type {Node} from 'react';

import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {Home, Search, Receipt, Person} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import * as ROUTES from 'constants/Routes';

const useStyles = makeStyles({
  root: {
    width: '100%',
    borderTop: '1px solid #D4D4D4',
    position: 'fixed',
    bottom: 0,
    zIndex: 999,
  },
});

function BottomNavigationBar(): Node {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Inicio"
        color="primary"
        component={Link}
        to={ROUTES.PROTECTED_ROOT}
        icon={<Home />}
      />
      <BottomNavigationAction
        label="Buscar"
        component={Link}
        to={ROUTES.PROTECTED_SEARCH}
        icon={<Search />}
      />
      <BottomNavigationAction
        label="Órdenes"
        component={Link}
        to={ROUTES.PROTECTED_ORDERS}
        icon={<Receipt />}
      />
      <BottomNavigationAction
        label="Cuenta"
        component={Link}
        to={ROUTES.PROTECTED_ACCOUNT}
        icon={<Person />}
      />
    </BottomNavigation>
  );
}

export default BottomNavigationBar;
