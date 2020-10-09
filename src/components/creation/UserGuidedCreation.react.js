// @flow strict

import type {Node} from 'react';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

function UserGuidedCreation(): Node {
  function searchAPI(event) {
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${event.target.value}key=AIzaSyBf0fe6a03CjZSJBmqKMFHT05KdIBjBpxc`,
    )
      .then((response) => response.json())
      .then((results) => {
        console.log(results);
      });
  }

  return (
    <main>
      <input onChange={searchAPI} />
    </main>
  );
}

export default UserGuidedCreation;
