// @flow strict

import type {Node} from 'react';

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, CssBaseline} from '@material-ui/core';
import {LoadScript} from '@react-google-maps/api';
import UserNameStep from 'components/user_creation/UserNameStep.react';
import {theme} from 'shared/theme';

function App(): Node {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}>
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
    </LoadScript>
  );
}

export default App;
