// @flow strict

import * as React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import FlexLayout from 'components/shared/FlexLayout.react';

const useStyles = makeStyles({
  root: {
    padding: 8,
    backgroundColor: 'transparent',
  },
  /* Styles applied to each dot if `variant="dots"`. */
  dot: {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
    borderRadius: '50%',
    width: 8,
    height: 8,
    margin: '0 4px',
  },
  /* Styles applied to a dot if `variant="dots"` and this is the active step. */
  dotActive: {
    backgroundColor: '#999',
  },
});

type Props = $ReadOnly<{
  className?: ?string,
  steps: number,
  activeStep: number,
}>;

export default function Stepper({className, activeStep, steps}: Props): React.Node {
  const classes = useStyles();

  return (
    <FlexLayout
      direction="horizontal"
      justify="between"
      align="center"
      className={clsx(classes.root, className)}
    >
      <FlexLayout direction="horizontal">
        {[...new Array(steps)].map((_, step) => {
          const dotClassName = clsx(classes.dot, {
            [classes.dotActive]: step === activeStep,
          });
          // eslint-disable-next-line react/no-array-index-key
          return <div key={step} className={dotClassName} />;
        })}
      </FlexLayout>
    </FlexLayout>
  );
}

Stepper.defaultProps = {
  activeStep: 0,
  position: 'bottom',
  variant: 'dots',
};
