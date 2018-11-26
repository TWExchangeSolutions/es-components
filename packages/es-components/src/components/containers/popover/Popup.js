import React from 'react';
import PropTypes from 'prop-types';

import { Manager, Target, Popper, Arrow } from 'react-popper';
import Transition from 'react-transition-group/Transition';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';

import { ArrowStyles } from './popoverStyles';

const defaultStyle = {
  transition: 'opacity 0.2s ease-in-out',
  opacity: 0,
  zIndex: 5
};
const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

function Popup({
  name,
  trigger,
  children,
  placement,
  arrowSize,
  onHide,
  hasTitle,
  transitionIn,
  transitionTimeout,
  disableFlipping,
  disableRootClose,
  popperRef
}) {
  let popperObj = (
    <Manager>
      <Target>{trigger}</Target>
      <Transition
        in={transitionIn}
        timeout={transitionTimeout}
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <Popper
            className={`${name}-popper`}
            placement={placement}
            eventsEnabled={transitionIn}
            modifiers={{
              preventOverflow: { boundariesElement: document.body },
              hide: { enabled: true },
              flip: {
                enabled: !disableFlipping,
                behavior: ['left', 'right', 'top', 'bottom']
              }
            }}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
            innerRef={popperRef}
          >
            {children}
            <Arrow className={`${name}-popper__arrow`} />
          </Popper>
        )}
      </Transition>
    </Manager>
  );

  if (!disableRootClose) {
    popperObj = (
      <RootCloseWrapper onRootClose={onHide}>{popperObj}</RootCloseWrapper>
    );
  }

  return (
    <>
      <ArrowStyles name={name} arrowSize={arrowSize} hasTitle={hasTitle} />
      {popperObj}
    </>
  );
}

Popup.propTypes = {
  name: PropTypes.string,
  trigger: PropTypes.node,
  children: PropTypes.node,
  onHide: PropTypes.func,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  arrowSize: PropTypes.oneOf(['sm', 'lg', 'none', 'default']),
  transitionIn: PropTypes.bool,
  transitionTimeout: PropTypes.number,
  hasTitle: PropTypes.bool,
  disableRootClose: PropTypes.bool,
  disableFlipping: PropTypes.bool,
  popperRef: PropTypes.func
};

Popup.defaultProps = {
  transitionTimeout: 100,
  placement: 'bottom'
};

export default Popup;
