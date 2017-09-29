import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import styled from 'styled-components';
import uncontrollable from 'uncontrollable';

import Button from '../../controls/buttons/Button';
import PopoverTrigger from './PopoverTrigger';

const PopoverButton = styled(Button)`
  border-bottom: ${props => (props.suppressUnderline ? 'none' : '1px dotted')};
  text-decoration: none;
`;

export class PopoverLink extends React.Component {
  toggleShow = () => {
    const showPopover = !this.props.showPopover;
    this.props.onToggle(showPopover);
  };

  hidePopover = () => {
    if (this.props.showPopover) {
      this.toggleShow();
    }
  };

  render() {
    const {
      children,
      popoverTitle,
      popoverContent,
      popoverPlacement,
      showPopover,
      showCloseButton,
      suppressUnderline
    } = this.props;

    return (
      <PopoverTrigger
        onHideOverlay={this.hidePopover}
        popoverContent={popoverContent}
        popoverPlacement={popoverPlacement}
        popoverTarget={this.popoverTarget}
        popoverTitle={popoverTitle}
        showPopover={showPopover}
        showCloseButton={showCloseButton}
      >
        <PopoverButton
          aria-haspopup="dialog"
          data-trigger="focus"
          handleOnClick={this.toggleShow}
          ref={btn => {
            this.popoverTarget = btn;
          }}
          styleType="link"
          suppressUnderline={suppressUnderline}
        >
          {children}
        </PopoverButton>
      </PopoverTrigger>
    );
  }
}

PopoverLink.propTypes = {
  /** The link content which activates the popover */
  children: PropTypes.node.isRequired,
  /** The text displayed in the popover title section */
  popoverTitle: PropTypes.string,
  /** The content displayed in the popover body */
  popoverContent: PropTypes.node.isRequired,
  /** The placement of the popover in relation to the link */
  popoverPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Function to toggle display of popover */
  onToggle: PropTypes.func,
  /** Displays or hides the popover */
  showPopover: PropTypes.bool,
  /** Display a close ('x') button */
  showCloseButton: PropTypes.bool,
  /** Hide underline from link. Useful for children like Icons */
  suppressUnderline: PropTypes.bool
};

PopoverLink.defaultProps = {
  popoverPlacement: 'top',
  onToggle: noop,
  showPopover: false,
  showCloseButton: false,
  suppressUnderline: false
};

const UncontrolledPopoverLink = uncontrollable(PopoverLink, {
  showPopover: 'onToggle'
});

export default UncontrolledPopoverLink;
