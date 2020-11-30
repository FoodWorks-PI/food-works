// @flow

import * as React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, CssBaseline} from '@material-ui/core';
import {LoadScript} from '@react-google-maps/api';
import {theme} from 'shared/theme';
import {StoreContext} from 'stores/hooks/CustomerStoreHooks';
import CustomerStore from 'stores/CustomerStore';
import UserExistsRenderer from 'components/shared/UserExistsRenderer.react';
import UserNameStep from 'components/user_creation/UserNameStep.react';
import UserLocationStep from 'components/user_creation/UserLocationStep.react';
import {ApolloProvider} from '@apollo/client';
import {client} from 'services/Apollo';
import * as ROUTES from 'constants/Routes';
import Onboarding from 'components/onboarding/Onboarding.react';
import KratosNoSessionRenderer from 'components/shared/KratosNoSessionRenderer.react';
import PlacesAutocompletePage from 'components/places/PlacesAutocompletePage.react';
import AccountPage from 'components/account/AccountPage.react';
import AccountDetails from 'components/account/AccountDetails.react';
import BottomNavigationBar from 'components/shared/BottomNavigationBar.react';
import HomePage from 'components/home/HomePage.react';
import AccountAddressUpdate from 'components/account/AccountAddressUpdate.react';
import SearchPage from 'components/search/SearchPage.react';
import ProductPage from 'components/product_details/ProductPage.react';

function App(): React.Node {
  return (
    <ApolloProvider client={client}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}>
        <StoreContext.Provider value={CustomerStore}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Switch>
                <Route exact path={ROUTES.PUBLIC_ROOT}>
                  <KratosNoSessionRenderer fallback={<p>Loading...</p>}>
                    <Onboarding />
                  </KratosNoSessionRenderer>
                </Route>
                <Route exact path={ROUTES.PROTECTED_ROOT}>
                  {/* TODO: Write a more user friendly fallback */}
                  <UserExistsRenderer fallback={<p>Loading...</p>}>
                    <HomePage />
                    <BottomNavigationBar />
                  </UserExistsRenderer>
                </Route>
                <Route exact path={ROUTES.CREATE_ONE}>
                  <UserNameStep />
                </Route>
                <Route exact path={ROUTES.CREATE_TWO}>
                  <UserLocationStep />
                </Route>
                <Route exact path={ROUTES.AUTOCOMPLETE_SEARCH}>
                  <PlacesAutocompletePage />
                </Route>
                <Route exact path={ROUTES.ACCOUNT}>
                  <AccountPage />
                </Route>
                <Route exact path={ROUTES.ACCOUNT_DETAILS}>
                  <AccountDetails />
                </Route>
                <Route exact path={ROUTES.PROTECTED_ADDRESS_UPDATE}>
                  <UserExistsRenderer fallback={<p>Loading...</p>}>
                    <AccountAddressUpdate />
                  </UserExistsRenderer>
                </Route>
                <Route exact path={ROUTES.PROTECTED_SEARCH}>
                  <UserExistsRenderer fallback={<p>Loading...</p>}>
                    <SearchPage />
                    <BottomNavigationBar />
                  </UserExistsRenderer>
                </Route>
                <Route exact path={ROUTES.PROTECTED_PRODUCT_DETAILS}>
                  <UserExistsRenderer fallback={<p>Loading...</p>}>
                    <ProductPage />
                  </UserExistsRenderer>
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
