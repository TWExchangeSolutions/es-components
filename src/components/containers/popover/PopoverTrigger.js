import React from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-overlays/lib/Overlay';

import Popover from './Popover';
import Fade from '../../util/Fade';
import FocusTrap from '../../util/FocusTrap';

function getArrowPlacement(popoverPlacement) {
  switch (popoverPlacement) {
    case 'top':
    case 'bottom':
      return popoverPlacement;
    case 'right':
      return 'left';
    case 'left':
      return 'right';
    default:
      return popoverPlacement;
  }
}

function PopoverTrigger({
  popoverId,
  popoverTitle,
  popoverContent,
  popoverTarget,
  shouldDisplayPopover = false,
  popoverPlacement = 'top',
  containsFormElement = false,
  onHideOverlay,
  children
}) {
  const focusTrapOptions = {
    onDeactivate: onHideOverlay
  };

  const arrowPlacement = getArrowPlacement(popoverPlacement);

  return (
    <span>
      {children}

      <Overlay
        show={shouldDisplayPopover}
        placement={popoverPlacement}
        target={popoverTarget}
        transition={Fade}
        onHide={onHideOverlay}
        rootClose={!containsFormElement}
      >
        <Popover
          id={popoverId}
          title={popoverTitle}
          arrowPlacement={arrowPlacement}
          containsFormElement={containsFormElement}
          dismissPopover={onHideOverlay}
        >
          <FocusTrap
            active={containsFormElement}
            focusTrapOptions={focusTrapOptions}
          >
            {popoverContent}
          </FocusTrap>
        </Popover>
      </Overlay>
    </span>
  );
}

PopoverTrigger.propTypes = {
  popoverId: PropTypes.string.isRequired,
  popoverTitle: PropTypes.string,
  popoverContent: PropTypes.node.isRequired,
  popoverTarget: PropTypes.object,
  shouldDisplayPopover: PropTypes.bool,
  popoverPlacement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  containsFormElement: PropTypes.bool,
  onHideOverlay: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default PopoverTrigger;
