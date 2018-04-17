import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import viaTheme from 'es-components-via-theme';

import Fieldset from '../../containers/fieldset/Fieldset';

import RadioButton from './RadioButton';
import { ThemeProvider, withTheme } from 'styled-components';

export function RadioGroup({
  name,
  radioOptions,
  legendContent,
  value,
  hasError = false,
  disableAllOptions = false,
  inline = true,
  onClick = noop,
  theme,
  extraContent
}) {
  return (
    <ThemeProvider theme={theme}>
      <Fieldset legendContent={legendContent} extraContent={extraContent}>
        {radioOptions.map((config, index) => {
          const radioId = `${name}-option-${index + 1}`;
          const checked = config.optionValue === value;
          const isDisabled = disableAllOptions || config.isDisabled;
          const radioProps = {
            name,
            checked,
            hasError,
            isDisabled,
            inline,
            onClick,
            id: radioId,
            optionText: config.optionText,
            value: config.optionValue,
            ariaHide: extraContent !== undefined,
            theme
          };
          return <RadioButton key={radioId} {...radioProps} />;
        })}
      </Fieldset>
    </ThemeProvider>
  );
}

const radioOptionShape = {
  optionText: PropTypes.string.isRequired,
  optionValue: PropTypes.any.isRequired,
  /** Render this option as disabled */
  isDisabled: PropTypes.bool
};

RadioGroup.propTypes = {
  /** The name of the radio group */
  name: PropTypes.string.isRequired,
  /** The content to render in the legend */
  legendContent: PropTypes.node,
  /** Options for the radio group to display */
  radioOptions: PropTypes.arrayOf(PropTypes.shape(radioOptionShape)).isRequired,
  /** Selected option for the radio group */
  value: PropTypes.any,
  /** Display all radio buttons in an errored state */
  hasError: PropTypes.bool,
  /** Disable all radio buttons */
  disableAllOptions: PropTypes.bool,
  /** Display the radio buttons inline */
  inline: PropTypes.bool,
  /** Function to execute when a radio button is selected */
  onClick: PropTypes.func,
  /** Extra content that can be rendered after the Legend but before the radio buttons, allows
   * content to be put in that will not affect the accessability of the Legend/Radio button relationship.
   */
  extraContent: PropTypes.node,
  theme: PropTypes.object
};

RadioGroup.defaultProps = {
  theme: viaTheme
};

export default withTheme(RadioGroup);
