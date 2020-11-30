// @flow strict

import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import {Typography, Paper, Chip} from '@material-ui/core';
import {Schedule, LocationOnOutlined} from '@material-ui/icons';
import RoundedImage from './RoundedImage.react';

const useStyles = makeStyles({
  root: {
    minWidth: 256,
    marginLeft: 8,
    marginRight: 8,
  },
  img: (props) => ({
    width: '100%',
    height: 88,
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundImage: `url(${props.product.img})`,
  }),
  title: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    padding: '0 3px 0 0',
  },
  content: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
  },
  fullRow: {
    width: '100%',
  },
  chipRow: {
    width: '100%',
    padding: 2,
  },
  titleRow: {
    width: '100%',
    flexGrow: 2,
  },
  logo: {
    margin: '0 0 -10px 8px',
    alignSelf: 'flex-end',
  },
  icon: {
    margin: '0 3px 0 0',
  },
});

type Props = {
  product: {
    id: number,
    title: string,
    time: string,
    location: string,
    price: number,
    img: string,
    logo: string,
  },
};

function ProductCard({product}: Props): React.Node {
  const classes = useStyles({product});

  return (
    <Paper elevation={3} className={classes.root}>
      <FlexLayout direction="vertical" justify="center">
        <FlexLayout className={classes.img} direction="vertical">
          <FlexLayout className={classes.chipRow} justify="end">
            <Chip
              size="small"
              color="primary"
              clickable={false}
              label="Quedan 2"
              style={{color: 'white'}}
            />
          </FlexLayout>
          <FlexLayout className={classes.titleRow} justify="between">
            <RoundedImage source={product.logo} className={classes.logo} />
            <Typography variant="h6" className={classes.title}>
              {product.title}
            </Typography>
          </FlexLayout>
        </FlexLayout>
        <FlexLayout className={classes.content} direction="vertical">
          <FlexLayout align="center">
            <Schedule style={{fontSize: 19}} className={classes.icon} />
            <Typography variant="subtitle2">{product.time}</Typography>
          </FlexLayout>
          <FlexLayout align="center" justify="between" className={classes.fullRow}>
            <FlexLayout>
              <LocationOnOutlined style={{fontSize: 19}} className={classes.icon} />
              <Typography variant="subtitle2">{product.location}</Typography>
            </FlexLayout>
            <Typography variant="body1" color="primary" align="right">
              ${product.price}
            </Typography>
          </FlexLayout>
        </FlexLayout>
      </FlexLayout>
    </Paper>
  );
}

export default ProductCard;
