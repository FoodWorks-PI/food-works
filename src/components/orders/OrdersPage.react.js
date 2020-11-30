// @flow strict

import * as React from 'react';
import {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Paper, Tabs, Tab, AppBar} from '@material-ui/core';

import FlexLayout from 'components/shared/FlexLayout.react';
import OrdersContainer from 'components/orders/OrdersContainer.react';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    marginTop: theme.mixins.toolbar.minHeight,
    marginBottom: theme.mixins.toolbar.minHeight,
    padding: 8,
  },
}));

function OrdersPage(): React.Node {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  function handleTabChange(e, newValue) {
    setValue(newValue);
  }

  return (
    <>
      <AppBar position="fixed">
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="secondary"
            onChange={handleTabChange}
            aria-label="order-tabs"
            variant="fullWidth"
          >
            <Tab label="Activas" disableRipple />
            <Tab label="Pasadas" disableRipple />
          </Tabs>
        </Paper>
      </AppBar>
      <FlexLayout className={classes.content}>
        <OrdersContainer />
      </FlexLayout>
    </>
  );
}

export default OrdersPage;
