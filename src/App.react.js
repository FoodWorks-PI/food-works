// @flow strict

import type {Node} from 'react';

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, CssBaseline} from '@material-ui/core';

import UserNameStep from 'components/user_creation/UserNameStep.react';
import {theme} from 'shared/theme';

function App(): Node {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/customer/protected">
            <UserNameStep />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
