import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* eslint-disable no-confusing-arrow */
const TabButton = styled.button`
  background-color: ${props =>
    props.selected ? props.theme.colors.white : props.theme.colors.gray2};
  border: 1px solid ${props => props.theme.colors.gray4};
  box-shadow: ${props =>
    props.selected ? '0 6px 12px rgba(0, 0, 0, 0.175)' : 'none'};
  color: ${props =>
    props.selected ? props.theme.colors.black : props.theme.colors.primary};
  display: inline-block;
  font-size: inherit;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  padding: 10px;
  text-align: left;

  &:focus {
    outline: 1px dotted ${props => props.theme.colors.gray4};
  }

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    background-color: ${props => props.theme.colors.white};
    border: ${props =>
      props.selected
        ? `1px solid ${props.theme.colors.gray4}`
        : '1px solid transparent'};
    border-bottom-color: ${props =>
      props.selected ? ' transparent' : `${props.theme.colors.gray4}`};
    box-shadow: none;
    color: ${props =>
      props.selected ? props.theme.colors.black : props.theme.colors.primary};
    padding: 10px 15px;
    margin: 0 2px 0px 0;

    &:hover,
    &:focus {
      background-color: ${props =>
        props.selected ? props.theme.colors.white : props.theme.colors.gray2};
    }
  }
`;

const AriaAnnouncer = styled.span`
  position: fixed;
  color: transparent;
  left: -1000px;
  top: 10px;
`;

/* eslint-enable */

function Tab({ name, selected, action, children, simpleName, ...props }) {
  return (
    <TabButton
      onClick={() => action(name, children, simpleName)}
      selected={selected}
      aria-label={`${simpleName || name} tab`}
      aria-expanded={selected}
      {...props}
    >
      {React.isValidElement(name)
        ? React.cloneElement(name, { selected })
        : name}
      {selected && (
        <AriaAnnouncer aria-live="assertive">{`${simpleName ||
          name} Sub text is now showing`}</AriaAnnouncer>
      )}
    </TabButton>
  );
}

Tab.propTypes = {
  /**
   * The name of the tab, and the displayed value
   */
  name: PropTypes.node.isRequired,
  /**
   * Whether the tab is selected and should be rendered to appear selected.
   */
  selected: PropTypes.bool,
  /**
   * The function to call when the tab is clicked
   */
  action: PropTypes.func,
  /**
   * The theme used to render the tab
   */
  theme: PropTypes.object,
  /**
   * Children to be rendered in the TabContent area.
   */
  children: PropTypes.node,

  /**
   * A simpler representation for screen readers.
   */
  simpleName: PropTypes.string
};

export default Tab;
