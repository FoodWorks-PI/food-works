// @flow strict

import React from 'react';
import logo from 'logo.svg';
import 'App.css';
import {useState} from 'react';
import useNetworkState from 'hooks/useNetworkState';
import {ApolloProvider, useMutation} from '@apollo/client';
import {apiClient, GET_CURRENT_USER, CREATE_USER} from 'services/apollo';
import {kratos} from 'services/kratos';
import {
  BrowserRouter as Router,
  Link,
  Route, // for later
  Switch,
} from 'react-router-dom';

const client = apiClient;

function RequestDemo() {
  const [createUser] = useMutation(CREATE_USER);
  function createUserClick() {
    createUser({
      variables: {
        input: {
          name: 'Alfredo',
          phone: '1111111',
          address: {
            latitude: 1.0,
            longitude: 2.0,
            streetLine: 'Casa',
          },
        },
      },
    });
  }

  return (
    <div>
      <button onClick={getSession}>Get Session</button>
      <button onClick={getUser}>Get User</button>
      <button onClick={createUserClick}>New User</button>
    </div>
  );
}

function getSession() {
  kratos.whoami().then((result) => console.log(result));
}

function getUser() {
  client
    .query({
      query: GET_CURRENT_USER,
    })
    .then((result) => console.log(result));
}

function App() {
  const [isOnline, connectedAt] = useNetworkState();
  const [count, setCount] = useState(0);

  function updateCount(): void {
    setCount(count + 1);
  }

  function PublicDemo() {
    return (
      <div>
        <a href="https://127.0.0.1:4455/auth/registration?clientApp=https://127.0.1:4455:/customer/protected">
          Register
        </a>
        <a href="https://127.0.0.1:4455/auth/login?clientApp=https://127.0.0.1:4455/customer/protected">
          Login
        </a>
        <RequestDemo />
      </div>
    );
  }

  function ProtectedDemo() {
    return (
      <div>
        <RequestDemo />
      </div>
    );
  }

  function HomeDemo() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{isOnline ? 'Connected' : 'Disconnected'}</p>
        {isOnline ? connectedAt?.toDateString() : null}
        <button onClick={updateCount}>{count}</button>
      </header>
    );
  }

  return (
    <ApolloProvider client={apiClient}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/home" component={HomeDemo} />
            <Route path="/public" component={PublicDemo} />
            <Route path="/customer/public" component={PublicDemo} />
            <Route path="/customer/protected" component={ProtectedDemo} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
