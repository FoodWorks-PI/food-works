// @flow strict

import type {Node} from 'react';

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, CssBaseline} from '@material-ui/core';

import UserGuidedCreation from 'components/creation/UserGuidedCreation.react';
import {theme} from 'shared/theme';

function App(): Node {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/customer/public">
            <UserGuidedCreation />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
