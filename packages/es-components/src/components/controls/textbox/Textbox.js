import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';
import { omit } from 'lodash';
import MaskedInput from 'react-text-mask';
import classnames from 'classnames';

import Icon from '../../base/icons/Icon';
import { LabelText, InputBase } from '../BaseControls';
import Label from '../Label';
import inputMaskType from './inputMaskType';

const defaultInputPad = '12px';
const rightPad = {
  0: defaultInputPad,
  1: '2em',
  2: '3.6em'
};
const paddings = css`
  padding-left: ${props => (props.hasPrepend ? '2em' : defaultInputPad)};
  padding-right: ${props => rightPad[props.numAppendIconNames]};
`;

const TextBoxLabel = styled(Label)`
  flex-basis: 50%;
`;

// apply styles to masked input, but remove props it doesn't use
const StyledMaskedInput = InputBase.withComponent(props => (
  <MaskedInput
    {...omit(props, [
      'borderColor',
      'boxShadow',
      'focusBorderColor',
      'focusBoxShadow',
      'hasPrepend',
      'initialValue',
      'numAppendIconNames'
    ])}
  />
));
const StyledMask = StyledMaskedInput.extend`
  ${paddings};
`;

const StyledText = styled(InputBase)`
  ${paddings};
`;

const AdditionalHelpContent = styled.div`
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: normal;
  margin: 10px 0 20px 0;
  text-transform: none;
`;

const addonAttrs = `
  font-weight: normal;
  pointer-events: none;
  position: absolute;
`;

const Prepend = styled(Icon)`
  ${addonAttrs} left: 9px;
  top: 9px;
`;

const Append = styled.div`
  ${addonAttrs} right: 9px;
  top: 8px;

  i {
    margin-left: 9px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex: auto;
  position: relative;
`;

const Textbox = props => {
  const {
    labelText,
    name,
    id,
    inline,
    inputRef,
    additionalHelpContent,
    validationState,
    prependIconName,
    appendIconName,
    maskType,
    customMask,
    theme,
    className,
    ...additionalTextProps
  } = props;
  const inputName = name || labelText.replace(/\s+/g, '');
  const textboxId = id !== undefined ? id : `for-${inputName}`;
  const hasHelpContent = additionalHelpContent !== undefined;
  const helpId = hasHelpContent ? `${textboxId}-help` : null;
  const additionalHelp = hasHelpContent && (
    <AdditionalHelpContent id={helpId} className="textbox__help">
      {additionalHelpContent}
    </AdditionalHelpContent>
  );
  const classNameState = `es-textbox__input--${validationState}`;

  const hasPrepend = prependIconName !== undefined;
  const hasAppend = appendIconName !== undefined;
  const hasValidationIcon = validationState !== 'default';

  let numAppendIconNames = 0;
  if (hasAppend) numAppendIconNames++;
  if (hasValidationIcon) numAppendIconNames++;

  const Input = maskType === 'none' ? StyledText : StyledMask;
  const maskArgs =
    maskType === 'custom' && customMask !== undefined
      ? customMask
      : inputMaskType[maskType];

  return (
    <TextBoxLabel
      className={classnames('es-textbox', className)}
      htmlFor={textboxId}
      color={theme.validationTextColor[validationState]}
      inline={inline}
    >
      <LabelText className="es-textbox__label" inline={inline}>
        {labelText}
      </LabelText>
      <InputWrapper className="es-textbox__wrapper">
        {hasPrepend && <Prepend name={prependIconName} size={20} />}
        <Input
          aria-describedby={helpId}
          className={classNameState}
          hasPrepend={hasPrepend}
          id={textboxId}
          innerRef={inputRef}
          name={inputName}
          numAppendIconNames={numAppendIconNames}
          type="text"
          {...maskArgs}
          {...additionalTextProps}
          {...theme.validationInputColor[validationState]}
        />
        {(hasAppend || hasValidationIcon) && (
          <Append>
            {hasValidationIcon && (
              <Icon
                name={theme.validationIconName[validationState]}
                size={20}
              />
            )}
            {hasAppend && <Icon name={appendIconName} size={20} />}
          </Append>
        )}
      </InputWrapper>
      {additionalHelp}
    </TextBoxLabel>
  );
};

Textbox.propTypes = {
  labelText: PropTypes.string.isRequired,
  /** The name of the input */
  name: PropTypes.string,
  /** Identifier of the input */
  id: PropTypes.string,
  /** Reference to the underlying input DOM element */
  inputRef: PropTypes.func,
  /** Display label inline with text box */
  inline: PropTypes.bool,
  /** Content to display underneath the text box */
  additionalHelpContent: PropTypes.node,
  /** Display label and text with contextual state colorings */
  validationState: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  /** Content to prepend input box with */
  prependIconName: PropTypes.string,
  /** Content to append to input box */
  appendIconName: PropTypes.string,
  /** Set the initial value, uncontrolled mode */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets a mask type on the input */
  maskType: PropTypes.oneOf([
    'none',
    'date',
    'dollar',
    'phone',
    'ssnum',
    'zip',
    'custom'
  ]),
  customMask: PropTypes.shape({
    mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    guide: PropTypes.bool,
    placeholderChar: PropTypes.string,
    keepCharPositions: PropTypes.bool,
    pipe: PropTypes.func,
    showMask: PropTypes.bool
  }),
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object,
  className: PropTypes.string
};

Textbox.defaultProps = {
  inline: false,
  maskType: 'none',
  validationState: 'default'
};

export default withTheme(Textbox);
