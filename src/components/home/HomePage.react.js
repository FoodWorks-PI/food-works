// @flow strict

import * as React from 'react';
import TopBar from 'components/home/AddressTopBar.react';
import Feed from 'components/home/Feed.react';

function HomePage(): React.Node {
  return (
    <>
      <TopBar />
      <Feed />
    </>
  );
}

export default HomePage;
