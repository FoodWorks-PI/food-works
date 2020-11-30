// @flow strict

import type {FeedCard} from 'constants/FeedTypes';

import * as React from 'react';
import ProductCard from 'components/shared/ProductCard.react';

type Props = {
  item: FeedCard,
};

export default function FeedCardElement({item}: Props): React.Node {
  if (item.__typename === 'Product') {
    // $ExpectError
    return <ProductCard product={{...item}} />;
  }
  return <div />;
}
