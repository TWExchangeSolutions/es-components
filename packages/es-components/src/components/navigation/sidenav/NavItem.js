import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { noop } from 'lodash';

import Icon from '../../base/icons/Icon';

const AnchorBase = styled.a`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
  text-decoration: none;

  > i {
    color: ${props => props.theme.colors.white};
  }

  &:hover {
    background-color: ${props => props.theme.colors.grayLighter};
    color: ${props => props.theme.colors.info};

    > i {
      color: ${props => props.theme.colors.info};
    }
  }

  ${props =>
    props.isActive &&
    css`
      background-color: ${props.theme.colors.info};
      color: ${props.theme.colors.white};

      &:hover {
        background-color: ${props.theme.colors.info};
        color: ${props.theme.colors.white};

        > i {
          color: ${props.theme.colors.white};
        }
      }
    `} ${props =>
  props.isDisabled &&
    css`
      background-color: ${props.theme.colors.grayLightest};
      color: ${props.theme.colors.grayDark};
      cursor: not-allowed;

      > span {
        pointer-events: none;
      }

      > i {
        color: ${props.theme.colors.grayLightest};
      }

      &:hover {
        background-color: ${props.theme.colors.grayLightest};
        color: ${props.theme.colors.grayDark};

        > i {
          color: ${props.theme.colors.grayLightest};
        }
      }
    `};
`;

const AnchorAltStyle = AnchorBase.extend`
  &:hover {
    border-left: 4px solid ${props => props.theme.colors.info};
    padding-left: 6px;
  }

  ${props =>
    props.isActive &&
    css`
      background-color: ${props.theme.colors.grayLight};
      border-left: 4px solid ${props.theme.colors.info};
      color: ${props.theme.colors.info};
      padding-left: 6px;

      > i {
        color: ${props.theme.colors.info};
      }

      &:hover {
        background-color: ${props.theme.colors.grayLight};
        color: ${props.theme.colors.info};

        > i {
          color: ${props.theme.colors.info};
        }
      }
    `} ${props =>
  props.isDisabled &&
    css`
      &:hover {
        border-left: none;
        padding-left: 10px;
      }
    `};
`;

const FlexSpan = styled.span`
  flex-grow: 1;
`;

const NavItem = props => {
  const {
    useAltStyle,
    children,
    className,
    highlightedId,
    id,
    isDisabled,
    isExternalLink,
    onClick,
    onNavClick,
    targetUrl
  } = props;

  const onNavItemClicked = () => {
    onNavClick(id);
    onClick(id);
  };

  const AnchorStyled = useAltStyle ? AnchorAltStyle : AnchorBase;
  const href = targetUrl || '#/';
  const openExternal = targetUrl && isExternalLink;

  const itemProps = {
    className,
    href,
    isActive: id === highlightedId,
    isDisabled,
    onClick: isDisabled ? noop : onNavItemClicked,
    ...(openExternal && { target: '_blank' })
  };

  return (
    <li>
      <AnchorStyled {...itemProps}>
        <FlexSpan>{children}</FlexSpan>
        <Icon name="chevron-right" />
      </AnchorStyled>
    </li>
  );
};

NavItem.propTypes = {
  /** @ignore */
  useAltStyle: PropTypes.bool,
  /** Item content */
  children: PropTypes.any,
  /** Additional CSS classes to apply */
  className: PropTypes.string,
  /** @ignore */
  highlightedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Each item must have a unique identifier */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Disable the nav item to render it un-clickable */
  isDisabled: PropTypes.bool,
  /** @ignore */
  isHighlighted: PropTypes.bool,
  /** Used to assign an onClick event */
  onClick: PropTypes.func,
  /** @ignore */
  onNavClick: PropTypes.func,
  /** Sets the link to open in a new browser window */
  isExternalLink: PropTypes.bool,
  /** Set the href target for the link */
  targetUrl: PropTypes.string
};

NavItem.defaultProps = {
  useAltStyle: false,
  isDisabled: false,
  isExternalLink: false,
  onClick: noop
};

export default NavItem;
