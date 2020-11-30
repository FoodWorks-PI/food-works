// @flow strict

import type {FeedItem} from 'constants/FeedTypes';

import * as React from 'react';
import FlexLayout from 'components/shared/FlexLayout.react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: 8,
  },
  scroll: {
    width: '100%',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    padding: 4,
  },
});

type Props = {
  feedItem: FeedItem,
};

export default function FeedItemRow({feedItem}: Props) {
  const classes = useStyles();
  return (
    <FlexLayout direction="vertical" className={classes.root}>
      <Typography variant="h6" gutterBottom>
        {feedItem.name}
      </Typography>
      <FlexLayout direction="horizontal" align="center" className={classes.scroll}>
        {feedItem.cards.map((item) => (
          <div key={item.ID} />
        ))}
      </FlexLayout>
    </FlexLayout>
  );
}
