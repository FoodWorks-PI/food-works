// @flow strict

import * as React from 'react';
import {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from 'components/shared/Button.react';
import SwipeableViews from 'react-swipeable-views';
import Stepper from 'components/onboarding/Stepper.react';
import {makeStyles} from '@material-ui/core/styles';
import FlexLayout from 'components/shared/FlexLayout.react';
import burger from 'assets/onboarding/burger.png';
import fries from 'assets/onboarding/fries.png';
import salad from 'assets/onboarding/salad.png';
import BASE_URL from 'services/config';

const SIGN_UP_URL = `${BASE_URL}/auth/registration?clientApp=${BASE_URL}/customer/protected`;

type Step = {|
  title: string,
  imageSrc: string,
  description: string,
  imageAlt: string,
|};

const steps: Array<Step> = [
  {
    title: '¡Pide comida de sobra!',
    description: 'Salva al planeta pidiendo comida que sobra',
    imageSrc: burger,
    imageAlt: 'burger',
  },
  {
    title: 'Ahorra dinero',
    description: 'La comida que sobra sale más barata',
    imageSrc: fries,
    imageAlt: 'fries',
  },
  {
    title: 'FOOD WORKS',
    description: '¡Empieza a salvar al mundo!',
    imageSrc: salad,
    imageAlt: 'salad',
  },
];

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100%',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  top: {
    paddingTop: 32,
    paddingBottom: 0,
    width: '100%',
  },
  stepper: {
    justifyContent: 'center',
    paddingBottom: 48,
    width: '100%',
  },
  text: {
    marginTop: 24,
    width: '100%',
  },
  body: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: 200,
  },
  start: {
    marginTop: 16,
  },
  textDescription: {
    maxWidth: 256,
  },
});

export default function Onboarding() {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();

  function handleChangeIndex(index) {
    setActiveStep(index);
  }

  function handleStart() {
    window.open(SIGN_UP_URL, '_self');
  }

  return (
    <FlexLayout direction="vertical" justify="between" className={classes.root}>
      <FlexLayout direction="vertical" className={classes.container}>
        <FlexLayout
          direction="vertical"
          justify="between"
          align="center"
          className={classes.top}
        >
          <Typography color="primary" align="center" variant="h4" gutterBottom>
            FOOD WORKS
          </Typography>
        </FlexLayout>
        <FlexLayout
          direction="vertical"
          justify="center"
          align="center"
          className={classes.body}
        >
          <SwipeableViews enableMouseEvents onChangeIndex={handleChangeIndex}>
            {steps.map((step) => {
              return (
                <FlexLayout key={step.title} direction="vertical" align="center">
                  <img
                    src={step.imageSrc}
                    alt={step.imageAlt}
                    className={classes.image}
                  />
                  <FlexLayout
                    direction="vertical"
                    align="center"
                    className={classes.text}
                  >
                    <Typography color="inherit" variant="h5" align="center" gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography
                      className={classes.textDescription}
                      color="inherit"
                      variant="body2"
                      align="center"
                    >
                      {step.description}
                    </Typography>
                  </FlexLayout>
                </FlexLayout>
              );
            })}
          </SwipeableViews>
          <Button className={classes.start} onClick={handleStart}>
            Empezar
          </Button>
        </FlexLayout>
      </FlexLayout>
      <Stepper
        activeStep={activeStep}
        steps={steps.length}
        className={classes.stepper}
      />
    </FlexLayout>
  );
}
