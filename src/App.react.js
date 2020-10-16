// @flow strict

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, CssBaseline} from '@material-ui/core';

import SignInPage from 'components/sign_in/SignInPage.react';
import {theme} from 'shared/theme';

import BottomNavigationBar from 'components/shared/BottomNavigationBar.react';
import HomePage from 'components/home/HomePage.react';

function Search() {
  return <h1>BUSCAR</h1>;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/sign-in">
            <SignInPage name="Alfredo" />
          </Route>
          <Route path="/customer/home">
            <HomePage />
          </Route>
          <Route path="/customer/search">
            <Search />
          </Route>
          <Route path="/customer/orders">
            <Search />
          </Route>
          <Route path="/customer/account">
            <Search />
          </Route>
        </Switch>
        <BottomNavigationBar />
      </Router>
    </ThemeProvider>
  );
}

export default App;
