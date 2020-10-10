// @flow strict

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, CssBaseline} from '@material-ui/core';

import SignInPage from 'components/sign_in/SignInPage.react';
import {theme} from 'shared/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/customer/public">
            <SignInPage name="Alfredo" />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
