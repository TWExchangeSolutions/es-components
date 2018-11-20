import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import { Label } from '../BaseControls';
import getRadioFillVariables from './radio-fill-variables';

function radioFill(color) {
  return `
    background-color: ${color};
    border-radius: 50%;
    content: '';
    display: block;
    height: 13px;
    left: 3px;
    position: relative;
    width: 13px;
    top: 3px;
    transition: background 0.25s linear;
  `;
}

const RadioLabel = styled(Label)`
  color: ${props =>
    props.disabled
      ? props.theme.colors.gray7
      : props.theme.colors[props.validationState]};
  cursor: pointer;
  display: flex;
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: bold;
  margin-bottom: 10px;
  position: relative;
  padding: 10px 0 10px 10px;
  text-transform: none;

  &:hover .es-radio__fill:before {
    ${props => radioFill(props.hoverFillColor)};
  }

  @media (min-width: ${props => props.theme.screenSize.phone}) {
    display: ${props => (props.inline ? 'inline-flex' : 'flex')};
    margin-right: ${props => (props.inline ? '15px' : '0')};
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    padding: 5px 0;
  }
`;

const RadioInput = styled.input`
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
  position: absolute;

  &:focus ~ .es-radio__fill {
    box-shadow: 0 0 3px 3px ${props => props.theme.colors.inputFocus};
  }
`;

const RadioDisplay = styled.span`
  border: 3px solid ${props => props.borderColor};
  border-radius: 50%;
  box-sizing: border-box;
  height: 25px;
  margin-right: 8px;
  width: 25px;

  &:before {
    ${props => radioFill(props.fill)};
  }
`;

export function RadioButton({
  optionText,
  name,
  inline,
  validationState,
  theme,
  ...radioProps
}) {
  const { hover, fill } = getRadioFillVariables(
    radioProps.checked,
    radioProps.disabled,
    validationState,
    theme.colors
  );
  const radioDisplayFill = radioProps.checked ? fill : theme.colors.white;

  const labelProps = {
    inline,
    disabled: radioProps.disabled,
    htmlFor: radioProps.id,
    hoverFillColor: hover,
    validationState
  };
  const classNameState = `es-radio__input--${validationState}`;

  return (
    <RadioLabel className="es-radio" {...labelProps}>
      <RadioInput
        type="radio"
        name={name}
        className={classNameState}
        {...radioProps}
      />
      <RadioDisplay
        className="es-radio__fill"
        borderColor={fill}
        fill={radioDisplayFill}
      />
      {optionText}
    </RadioLabel>
  );
}

RadioButton.propTypes = {
  optionText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  /** Display radio button with contextual state colorings */
  validationState: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object.isRequired
};

RadioButton.defaultProps = {
  inline: true,
  validationState: 'default'
};

export default withTheme(RadioButton);
