// @flow strict

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import SignInPage from 'components/sign_in/SignInPage.react';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in">
          <SignInPage name="Alfredo" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
