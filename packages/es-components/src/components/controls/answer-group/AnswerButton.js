import React from 'react';
import styled from 'styled-components';
import genId from '../../util/generateAlphaName';
import { useTheme } from '../../util/useTheme';

const AnswerLabel = styled.label`
  background-color: ${props => props.style.bgColor};
  border-color: transparent;
  box-shadow: 0 4px 0 0 ${props => props.style.boxShadowColor};
  color: ${props => props.style.textColor};
  flex-grow: 1;
  font-weight: ${props => props.style.fontWeight || 'normal'};
  font-size: ${props => props.style.fontSize};
  margin-bottom: 4px;
  margin-top: 0;
  text-align: center;
  text-transform: ${props =>
    props.style.textTransform ? props.style.textTransform : 'none'};
  transition: background-color 250ms linear, color 250ms linear;

  &:hover {
    background-color: ${props => props.style.successHover};
  }

  &:active {
    background-color: ${props => props.style.activeBgColor};
    box-shadow: 0 0 0 0 transparent;
    color: ${props => props.style.activeTextColor};
    margin-bottom: 0;
    margin-top: 4px;
  }

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    flex-grow: 0;
    min-width: ${props => props.itemWidth};
  }
`;

const OutlineAnswerLabel = styled(AnswerLabel)`
  background-color: transparent;
  border: 2px solid ${props => props.style.bgColor};
  box-shadow: none;
  box-sizing: border-box;
  color: ${props => props.style.bgColor};
  margin: 0;
  text-align: center;
  text-transform: ${props =>
    props.style.textTransform ? props.style.textTransform : 'none'};

  &:active {
    background-color: ${props => props.selected.activeBgColor};
    color: ${props => props.selected.activeTextColor};
    margin: 0;
  }

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:first-child + label {
    border-left: none;
  }

  &:last-child {
    border-left: none;
    border-radius: 0 4px 4px 0;
  }

  &:not(:first-child):not(:last-child) {
    border-left: 1px;
  }
`;

const AnswerDisplay = styled.span`
  display: block;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 10px 10px 10px;
  text-align: center;
  user-select: none;
`;

const AnswerInput = styled.input`
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; /* added line */
  width: 1px;

  &:checked + span {
    background-color: ${props => props.selected.bgColor};
    box-shadow: 0 4px 0 0 ${props => props.selected.boxShadowColor};
    /* Selected Color should always be white */
    color: ${props => props.selected.textColor};
  }
`;

const OutlineAnswerInput = styled(AnswerInput)`
  &:checked + span {
    background-color: ${props => props.selected.bgColor};
    box-shadow: 0 0 0 0 ${props => props.selected.boxShadowColor};
    /* Selected Color should always be white */
    color: ${props => props.selected.textColor};
  }
`;

function AnswerButton({
  name,
  children,
  itemWidth,
  styleType,
  selectedType,
  isOutline,
  ...radioProps
}) {
  const id = radioProps.id || genId();
  const theme = useTheme();
  const style = theme.buttonStyles.button.variant[styleType];
  const selected = theme.buttonStyles.button.variant[selectedType];

  const labelProps = {
    itemWidth,
    style,
    selected
  };

  let button = (
    <AnswerLabel {...labelProps}>
      <AnswerInput
        type="radio"
        name={name}
        id={id}
        {...radioProps}
        {...labelProps}
      />
      <AnswerDisplay>{children}</AnswerDisplay>
    </AnswerLabel>
  );

  if (isOutline) {
    button = (
      <OutlineAnswerLabel {...labelProps}>
        <OutlineAnswerInput
          type="radio"
          name={name}
          id={id}
          {...radioProps}
          {...labelProps}
        />
        <AnswerDisplay>{children}</AnswerDisplay>
      </OutlineAnswerLabel>
    );
  }

  return button;
}

export default AnswerButton;