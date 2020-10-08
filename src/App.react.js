// @flow strict

import React from 'react';
import logo from 'logo.svg';
import 'App.css';
import {useState} from 'react';
import useNetworkState from 'hooks/useNetworkState';
import {ApolloProvider} from '@apollo/client';
import {apiClient} from 'services/apollo';
import {kratos} from 'services/kratos';
import {
  BrowserRouter as Router,
  Route, // for later
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <ApolloProvider client={apiClient}>
      <div className="App">
        <Router>
          <Switch></Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
