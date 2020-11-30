// @flow strict

import type {FeedCard} from 'constants/FeedTypes';

import * as React from 'react';
import ProductCard from 'components/shared/ProductCard.react';
import RestaurantCard from 'components/shared/RestaurantCard.react';

type Props = {
  item: FeedCard,
};

export default function FeedCardElement({item}: Props): React.Node {
  if (item.__typename === 'Product') {
    // $ExpectError
    return <ProductCard product={{...item}} />;
  }

  if (item.__typename === 'Restaurant') {
    return <RestaurantCard restaurant={{...item}} />;
  }
  return <div />;
}
