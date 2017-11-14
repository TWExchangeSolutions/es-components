import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Textbox from '../../controls/textbox/Textbox';
import ReactDatePicker from 'react-datepicker';
import uncontrollable from 'uncontrollable';

class DateTextbox extends React.PureComponent {
  static propTypes = Textbox.propTypes;

  componentDidMount() {
    this.inputElement = findDOMNode(this).querySelector('input');
  }

  focus() {
    this.inputElement.focus();
  }

  render() {
    return <Textbox {...this.props} />;
  }
}

export const DatePicker = props => {
  const {
    additionalHelpContent,
    children,
    labelText,
    placeholder,
    selectedDate,
    ...otherProps
  } = props;

  const textbox = (
    <DateTextbox
      labelText={labelText}
      maskType="date"
      appendIconName="calendar"
      additionalHelpContent={additionalHelpContent}
    />
  );

  return (
    <ReactDatePicker
      selected={selectedDate}
      customInput={textbox}
      placeholderText={placeholder}
      {...otherProps}
    >
      {children}
    </ReactDatePicker>
  );
};

DatePicker.propTypes = {
  /** Additional text displayed below the input */
  additionalHelpContent: PropTypes.node,
  /** Content to display within and below the calendar */
  children: PropTypes.node,
  /** Label to display above datepicker */
  labelText: PropTypes.string.isRequired,
  /** Name property for the form control */
  name: PropTypes.string,
  /** Callback fired when a valid date is entered */
  onChange: PropTypes.func.isRequired,
  /** Callback fired when input value is changed */
  onChangeRaw: PropTypes.func,
  /** Callback fired when datepicker loses focus */
  onBlur: PropTypes.func,
  /** input field placeholder */
  placeholder: PropTypes.string,
  /** Moment object representing the selected date */
  selectedDate: PropTypes.object,
  /** Array of moment objects to exclude from the calendar */
  excludeDates: PropTypes.array,
  /** Array of moment objects to highlight on the calendar */
  highlightDates: PropTypes.array,
  /** Array of moment objects to whitelist on calendar */
  includeDates: PropTypes.array,
  /** Function used to filter calendar dates */
  filterDate: PropTypes.func,
  /** Sets the datepicker as the Start input of a data range */
  selectsStart: PropTypes.bool,
  /** Sets the datepicker as the End input of a date range */
  selectsEnd: PropTypes.bool,
  /** Sets the start date (moment) in a range */
  startDate: PropTypes.object,
  /** Sets the end date (moment) in a range */
  endDate: PropTypes.object
};

DatePicker.defaultProps = {
  onBlur: noop,
  onChangeRaw: noop,
  placeholder: 'mm/dd/yyyy'
};

const UncontrolledDatePicker = uncontrollable(DatePicker, {
  selectedDate: 'onChange'
});

export default UncontrolledDatePicker;
