// @flow

import type {Node} from 'react';

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, CssBaseline} from '@material-ui/core';
import {LoadScript} from '@react-google-maps/api';
import {theme} from 'shared/theme';
import {StoreContext} from 'stores/hooks/CustomerStoreHooks';
import CustomerStore from 'stores/CustomerStore';
import UserExistsRenderer from 'components/shared/UserExistsRenderer.react';
import UserNameStep from 'components/user_creation/UserNameStep.react';
import {ApolloProvider} from '@apollo/client';
import {client} from 'services/Apollo';

function App(): Node {
  return (
    <ApolloProvider client={client}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}>
        <StoreContext.Provider value={CustomerStore}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Switch>
                <Route exact path="/customer/protected/">
                  {/* TODO: Write a more user friendly fallback */}
                  <UserExistsRenderer fallback={<p>Loading...</p>}>
                    <div>User Created!</div>
                  </UserExistsRenderer>
                </Route>
                <Route exact path="/customer/protected/create/one/">
                  <UserNameStep />
                </Route>
              </Switch>
            </Router>
          </ThemeProvider>
        </StoreContext.Provider>
      </LoadScript>
    </ApolloProvider>
  );
}

export default App;
