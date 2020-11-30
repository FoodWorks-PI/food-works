// @flow strict

import type {Product} from 'constants/FeedTypes';

import * as React from 'react';
import FlexLayout from 'components/shared/FlexLayout.react';
import {makeStyles} from '@material-ui/core/styles';
import nullthrows from 'utils/nullthrows';
import donuts from 'assets/donuts.jpg';
import dLogo from 'assets/ddlogo.jpg';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from 'react-router-dom';
import RoundedImage from 'components/shared/RoundedImage.react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined';
import Button from 'components/shared/Button.react';
import useBoolean from 'hooks/useBoolean';
import ReservationDialog from 'components/product_details/ReservationDialog.react';
import * as ROUTES from 'constants/Routes';
import {gql, useMutation} from '@apollo/client';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {BASE_MEDIA_URL} from 'services/config';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    '& > *': {
      width: '100%',
    },
  },
  productImageContainer: (props: Props) => {
    let productImage = nullthrows(props.product.image);
    productImage = productImage !== '' ? `${BASE_MEDIA_URL}/${productImage}` : donuts;
    return {
      width: '100%',
      height: 160,
      objectFit: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '100%',
      backgroundImage: `url(${productImage})`,
      position: 'relative',
    };
  },
  imageOpacity: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  navigation: {
    width: '100%',
    height: theme.mixins.toolbar.minHeight,
    color: theme.palette.common.white,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  row: {
    width: '100%',
    padding: theme.spacing(1),
  },
  logo: {
    flex: 1,
  },
  title: {
    maxWidth: '75%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  subtitle: {
    fontWeight: 500,
  },
  tags: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  icon: {
    marginRight: 2,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  detailsMetric: {
    marginBottom: theme.spacing(1),
  },
  cost: {
    fontWeight: 700,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
    paddingTop: theme.spacing(0.5),
  },
  buttonReady: {
    width: '80%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CREATE_ORDER = gql`
  mutation CreateOrder($input: RegisterOrderInput!) {
    createOrder(input: $input)
  }
`;

type Props = {
  product: Product,
};

export default function ProductDetails(props: Props): React.Node {
  const classes = useStyles(props);
  const history = useHistory();
  const {value: open, setFalse, setTrue} = useBoolean(false);
  const [createOrder, {loading}] = useMutation(CREATE_ORDER, {
    onCompleted() {
      history.replace({
        pathname: ROUTES.PROTECTED_ORDERS,
      });
    },
  });

  let restaurantLogo = nullthrows(props.product.restaurant?.image);
  restaurantLogo = restaurantLogo !== '' ? `${BASE_MEDIA_URL}/${restaurantLogo}` : dLogo;

  function onPay(_, _ignore, quantity) {
    setFalse();
    if (quantity != null) {
      createOrder({
        variables: {
          input: {
            productID: props.product.ID,
            quantity,
          },
        },
      });
    }
  }

  return (
    <>
      <FlexLayout direction="vertical" className={classes.root}>
        <div className={classes.productImageContainer}>
          <div className={classes.imageOpacity} />
          <FlexLayout align="center" className={classes.navigation}>
            <IconButton edge="start" color="inherit" onClick={history.goBack}>
              <ArrowBackIcon />
            </IconButton>
          </FlexLayout>
        </div>
        <Paper elevation={2} className={classes.section}>
          <FlexLayout className={classes.row} align="center">
            <div className={classes.logo}>
              <RoundedImage source={restaurantLogo} />
            </div>
            <Typography variant="h6" className={classes.title}>
              {nullthrows(props.product.name)}
            </Typography>
          </FlexLayout>
          <Typography className={classes.cost} variant="subtitle2">
            ${nullthrows(props.product.cost)}
          </Typography>
          <FlexLayout className={classes.row} direction="vertical">
            <Typography className={classes.subtitle} variant="subtitle1" gutterBottom>
              Descripción
            </Typography>
            <Typography variant="body2" gutterBottom>
              {nullthrows(props.product.description)}
            </Typography>
            <Typography className={classes.subtitle} variant="subtitle1" gutterBottom>
              Etiquetas
            </Typography>
            <FlexLayout className={classes.tags}>
              {nullthrows(props.product.tags).map((tag) => (
                <Chip color="primary" key={tag} label={tag} />
              ))}
            </FlexLayout>
          </FlexLayout>
        </Paper>
        <Paper elevation={2} className={classes.section}>
          <FlexLayout className={classes.row} direction="vertical">
            <Typography className={classes.subtitle} variant="subtitle1" gutterBottom>
              Detalles
            </Typography>
            <FlexLayout className={classes.detailsMetric}>
              <LocationOnOutlined style={{fontSize: 20}} className={classes.icon} />
              <Typography variant="subtitle2" style={{marginRight: 4}}>{`${nullthrows(
                props.product.distance?.toFixed(2),
              )} km`}</Typography>
            </FlexLayout>
            <FlexLayout className={classes.detailsMetric}>
              <StarBorderIcon style={{fontSize: 20}} className={classes.icon} />
              <Typography variant="subtitle2">
                {nullthrows(props.product.averageRating?.toFixed(2))}
              </Typography>
            </FlexLayout>
            <FlexLayout className={classes.detailsMetric}>
              <Typography variant="subtitle2">
                {nullthrows(props.product.restaurant?.address?.streetLine)}
              </Typography>
            </FlexLayout>
          </FlexLayout>
        </Paper>
        <Paper elevation={2} className={classes.section}>
          <FlexLayout className={classes.row} align="center" justify="center">
            <Button className={classes.buttonReady} onClick={setTrue}>
              ¡Ordena ya!
            </Button>
          </FlexLayout>
        </Paper>
      </FlexLayout>
      <ReservationDialog open={open} onClose={onPay} product={props.product} />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
