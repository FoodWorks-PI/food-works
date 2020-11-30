// @flow strict

import * as React from 'react';
import {gql, useQuery} from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import FlexLayout from 'components/shared/FlexLayout.react';
import {makeStyles} from '@material-ui/core/styles';
import FeedItemRow from 'components/home/FeedItemRow.react';

const useStyles = makeStyles((theme) => ({
  body: {
    width: '100%',
    overflowY: 'scroll',
    whiteSpace: 'nowrap',
    marginTop: theme.mixins.toolbar.minHeight,
    marginBottom: theme.mixins.toolbar.minHeight,
    padding: 8,
  },
}));

const GET_FEED = gql`
  query GetFeed {
    getFeed {
      name
      cards {
        ... on Product {
          ID
          name
          description
          cost
          distance
          image
          restaurant {
            image
          }
        }
        ... on Restaurant {
          ID
          name
          distance
          image
        }
        __typename
      }
    }
  }
`;

export default function Feed(): React.Node {
  const classes = useStyles();
  const {data, loading, error} = useQuery(GET_FEED);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (!loading && error != null) {
    return <Typography>Error...</Typography>;
  }

  return (
    <FlexLayout direction="vertical" className={classes.body}>
      {data.getFeed.map((feedItem) => (
        <FeedItemRow key={feedItem.name} feedItem={feedItem} />
      ))}
    </FlexLayout>
  );
}
