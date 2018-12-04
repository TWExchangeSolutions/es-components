import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';
import LinkButton from './LinkButton';
import { useTheme } from '../../util/useTheme';

const StyledButton = styled(LinkButton)`
  border-bottom-width: 1px;
  border-bottom-style: dashed;
  border-bottom-color: ${props =>
    props.suppressUnderline ? 'transparent' : 'initial'};
  margin-bottom: 2px;
  text-decoration: none;

  &:hover {
    border-bottom-style: solid;
  }
`;

function InnerButton({
  children,
  styleType,
  innerRef,
  suppressUnderline,
  ...buttonProps
}) {
  const theme = useTheme();
  const variant = theme.buttonStyles.button.variant[styleType];
  const { className, ...otherProps } = buttonProps;
  const sharedProps = {
    variant,
    suppressUnderline,
    ref: innerRef,
    ...otherProps
  };

  return (
    <StyledButton
      {...sharedProps}
      className={classnames('es-button es-button--popover-trigger', className)}
    >
      {children}
    </StyledButton>
  );
}

const PopoverLink = React.forwardRef((props, ref) => (
  <InnerButton innerRef={ref} {...props} />
));

PopoverLink.propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme */
  styleType: PropTypes.string,
  /** Hide underline from link. Useful for children like Icons */
  suppressUnderline: PropTypes.bool
};

PopoverLink.defaultProps = {
  styleType: 'default',
  block: false,
  size: 'default',
  suppressUnderline: false
};

export default PopoverLink;
