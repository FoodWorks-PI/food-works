// @flow

import type {Node} from 'react';

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, CssBaseline} from '@material-ui/core';
import {LoadScript} from '@react-google-maps/api';
import PlacesAutocompletePage from 'components/places_autocomplete/PlacesAutocompletePage.react';
import {theme} from 'shared/theme';
import {StoreContext} from 'stores/hooks/CustomerStoreHooks';
import CustomerStore from 'stores/CustomerStore';

function App(): Node {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}>
      <StoreContext.Provider value={CustomerStore}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route path="/customer/protected">
                <PlacesAutocompletePage />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </StoreContext.Provider>
    </LoadScript>
  );
}

export default App;
