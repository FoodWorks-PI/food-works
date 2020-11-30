/* eslint-disable no-unused-expressions */
// @flow strict

import * as React from 'react';
import {useCallback, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';

type Type = 'button' | 'submit';

const useStyles = makeStyles({
  root: (props) => ({
    background: 'none',
    backgroundColor: props.isDisabled ? '#99b9ef' : '#7ea8ef',
    color: '#fff',
    lineHeight: 1.42858,
    border: 'none',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 8,
    fontWeight: 700,
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(0,0,0,0.4)',
    '&:active': {
      backgroundColor: !props.isDisabled ? '#6b9cef' : '#99b9ef',
    },
  }),
  content: (props) => ({
    opacity: props.isLoading ? 0 : 1,
  }),
  hiddenButton: {
    display: 'none',
  },
});

type Props = $ReadOnly<{
  onClick?: ?(e: SyntheticMouseEvent<>) => mixed,
  children: React.Node,
  className?: ?string,
  isLabelHidden?: boolean,
  isDisabled?: boolean,
  isLoading?: boolean,
  type?: Type,
}>;

function Button({
  onClick,
  children,
  className,
  isDisabled = false,
  isLabelHidden = false,
  isLoading = false,
  type = 'button',
}: Props): React.Node {
  const classes = useStyles({isDisabled, isLoading});
  const nativeButtonRef = useRef(null);

  const hasNativeButton = type === 'submit';

  const onClickInternal = useCallback(
    (e) => {
      // Handle type submit
      if (hasNativeButton) {
        nativeButtonRef.current?.click();
      }
      onClick?.(e);
    },
    [hasNativeButton, onClick],
  );

  return (
    <>
      <div
        className={clsx(classes.root, className)}
        onClick={
          !isDisabled
            ? hasNativeButton || onClick != null // Loosely equal to undefined
              ? onClickInternal
              : null
            : null
        }
        role="button"
      >
        {isLabelHidden ? '\u200B' : <span className={classes.content}>{children}</span>}
        {isLoading && <CircularProgress size={16} />}
      </div>
      {hasNativeButton && (
        <div className={classes.hiddenButton}>
          <button ref={nativeButtonRef} type={type} />
        </div>
      )}
    </>
  );
}

export default Button;
