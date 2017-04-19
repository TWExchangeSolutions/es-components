import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import styled from 'styled-components';

import { alertVariations } from './alert-variations';

import Icon from '../icons/Icon';
import Button from '../../controls/buttons/Button';
import { colors } from '../../theme';

const DismissButton = styled.button`
  align-self: flex-start;
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: 27px;
  font-weight: bold;
  opacity: 0.2;
  text-shadow: 0 1px 0 ${colors.white};
`;

function renderDismissButton(onDismiss) {
  return (
    <DismissButton aria-label="Close" onClick={onDismiss} className="alert__dismiss">
      <span aria-hidden="true">&times;</span>
    </DismissButton>
  );
}

const iconMap = {
  success: 'ok-sign',
  information: 'info-sign',
  warning: 'exclaimation-sign',
  danger: 'exclaimation-sign',
  advisor: 'agent'
};

const AlertIcon = styled(Icon)`
  margin-right: 5px;
`;

function renderIcon(type) {
  const iconName = iconMap[type];
  return <AlertIcon name={iconName} />;
}

const LeadingHeader = styled.p`
  margin: 0;
`;

function renderLeadingHeader(alertType, includeIcon, leadingHeader, leadingText) {
  const hasLeadingHeaderText = leadingHeader !== undefined;
  const hasLeadingText = leadingText !== undefined;

  return (
    <LeadingHeader>
      {includeIcon ? renderIcon(alertType) : null}
      {hasLeadingHeaderText ? <strong>{leadingHeader}<br /></strong> : null}
      {hasLeadingText ? leadingText : null}
    </LeadingHeader>
  );
}

/**
 * The selector on the buttons is to ensure that the primary button does not
 * get a margin. Because the flex-direction is row-reverse, it has to be a weird looking
 * inverse that kind of goes against normal thinking
 */
const CallsToAction = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row-reverse;
  padding: 0 15px 15px 0;

  & > button:not(:first-of-type) {
    margin-right: 15px;
  }
`;

function renderCallsToAction(callsToAction) {
  return (
    <CallsToAction>
      {callsToAction.map((callToAction, index) => {
        const type = index === 0 ? 'primary' : 'default';

        return (
          <Button
            type={type}
            key={index}
            handleOnClick={callToAction.action}
          >
            {callToAction.actionButtonContent}
          </Button>
        );
      })}
    </CallsToAction>
  );
}

const BaseAlertContainer = styled.div`
   background-color: ${props => props.alertVariation.color};
   border: 1px solid ${props => props.alertVariation.borderColor};
   border-radius: 2px;
   color: ${props => props.alertVariation.foregroundColor};
   margin-bottom: 25px;
`;

const DismissableAlertContainer = styled(BaseAlertContainer)`
  display: flex;
  justify-content: space-between;
`;

const AlertContent = styled.div`
  padding: 15px;
`;

function Alert({
  type,
  header,
  additionalText,
  callsToAction = [],
  children,
  includeIcon = false,
  dismissable = false,
  onDismiss = noop
}) {
  const alertVariation = alertVariations[type];
  const hasCallsToAction = callsToAction.length > 0;

  const AlertContainer = dismissable ? DismissableAlertContainer : BaseAlertContainer;

  return (
    <AlertContainer alertVariation={alertVariation} role="alert">
      <AlertContent>
        {renderLeadingHeader(type, includeIcon, header, additionalText)}
        {children}
      </AlertContent>
      {dismissable ? renderDismissButton(onDismiss) : null}
      {hasCallsToAction ? renderCallsToAction(callsToAction) : null}
    </AlertContainer>
  );
}

const alertTypes = ['success', 'information', 'warning', 'danger', 'advisor'];

const callToActionShape = {
  actionButtonContent: PropTypes.node.isRequired,
  /** Function that executes when a button is clicked */
  action: PropTypes.func.isRequired
};

Alert.propTypes = {
  type: PropTypes.oneOf(alertTypes).isRequired,
  /** The bolded text in the leading text */
  header: PropTypes.string,
  /** The non-bolded text in the leading text */
  additionalText: PropTypes.string.isRequired,
  /** Additional elements rendered after the leading text */
  children: PropTypes.element,
  /** Include the corresponding icon in the alert's leading text */
  includeIcon: PropTypes.bool,
  /** Render a dismiss button */
  dismissable: PropTypes.bool,
  /** Function to execute when dismiss button is clicked */
  onDismiss: PropTypes.func,
  callsToAction: PropTypes.arrayOf(PropTypes.shape(callToActionShape))
};

export default Alert;
