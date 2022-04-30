import { styled } from '../../../utils';
import { Colors, GridBreakpointsMediaDown, GridBreakpointsMediaUp, spacingStyle } from '../../../const';
import { IconStyled } from '../../icon';
import { ListGroupCheckedProps } from './types';
import { ListGroupCheckedSizeArrayType, ListGroupCheckedSizeStyles } from './const';

export const ListGroupCheckedItemStatusStyled = styled('span')`
  display: block;
  text-align: left;
  color: ${Colors.success};
  line-height: 1.57;
  font-size: 14px;
  font-weight: 300;
`;
export const ListGroupCheckedItemTitleStyled = styled('span')<{ measure?: ListGroupCheckedSizeArrayType }>`
  display: block;
  text-align: left;
  line-height: 1.5;
  color: ${Colors.gray800};
  margin-bottom: 4px;
  ${({ measure }) => measure && `font-size: ${ListGroupCheckedSizeStyles[measure].fontSize}px`};
`;
export const ListGroupCheckedItemStyled = styled('li')<{ active?: boolean; measure?: ListGroupCheckedSizeArrayType }>`
  position: relative;
  list-style: none;
  width: 100%;

  &::before {
    content: '';
    ${({ measure }) =>
      measure &&
      `
      width: ${ListGroupCheckedSizeStyles[measure].height}px;
      height: ${ListGroupCheckedSizeStyles[measure].height}px;
    `};
    display: block;
    border: 1px dotted ${Colors.primary};
    border-radius: 100%;
    z-index: 1;
    position: absolute;
    ${({ measure }) => measure && `left: -${ListGroupCheckedSizeStyles[measure].paddingLeft}px`};
    top: 0;

    ${GridBreakpointsMediaUp.lg} {
      background: ${Colors.white};
    }

    ${GridBreakpointsMediaDown.md} {
      background: ${Colors.secondaryLight};
    }
  }

  > a {
    text-decoration: none;

    ${ListGroupCheckedItemTitleStyled} {
      text-decoration: underline;
    }
  }

  ${IconStyled} {
    z-index: 1;
    position: absolute;
    ${({ measure }) =>
      measure &&
      `
        left: -${ListGroupCheckedSizeStyles[measure].iconLeft}px;
        top: ${ListGroupCheckedSizeStyles[measure].iconTop}px;
        font-size: ${ListGroupCheckedSizeStyles[measure].iconFontSize}px;
    `};
  }

  &:hover {
    &::before {
      border-style: solid;
    }

    ${ListGroupCheckedItemTitleStyled} {
      color: ${Colors.primary};
      text-decoration: none;
    }
  }

  ${({ active }) =>
    active &&
    `
    &::before {
      border-style: solid;
      background-color: ${Colors.primary};
      color: ${Colors.white};
    }

    &::after {
      border-style: solid;
      left: -38px;
    }

    ${ListGroupCheckedItemTitleStyled} {
      font-weight: bold;
      color: ${Colors.primary};
      text-decoration: none;
    }

    ${ListGroupCheckedItemStatusStyled},
    ${ListGroupCheckedItemTitleStyled} {
      color: ${Colors.primary};
    }
  `}
`;
export const ListGroupCheckedStyled = styled('ul')<ListGroupCheckedProps>`
  margin-top: -9px;
  ${({ measure }) => measure && `padding-left: ${ListGroupCheckedSizeStyles[measure].paddingLeft}px`};
  position: relative;
  ${(props) => spacingStyle(props)}

  /* stylelint-disable-next-line no-descending-specificity */
  ${ListGroupCheckedItemStyled} {
    &:not(:last-child) {
      margin-bottom: 23px;

      ${GridBreakpointsMediaUp.lg} {
        ${({ measure }) => measure && `min-height: ${ListGroupCheckedSizeStyles[measure].minHeight}px`};
      }
    }

    &:not(:first-of-type)::after {
      content: '';
      display: block;
      position: absolute;
      left: -37px;
      width: 1px;
      border-right: 1px dotted ${Colors.primary};

      ${GridBreakpointsMediaUp.lg} {
        ${({ measure }) =>
          measure &&
          `
          height: ${ListGroupCheckedSizeStyles[measure].minHeight + 17}px;
          top: -${ListGroupCheckedSizeStyles[measure].minHeight + 15}px;
        `};
      }

      ${GridBreakpointsMediaDown.md} {
        ${({ measure }) =>
          measure &&
          `
            height: ${ListGroupCheckedSizeStyles[measure].minHeight}px;
            top: -${ListGroupCheckedSizeStyles[measure].minHeight - 2}px;
        `};
      }
    }
  }
`;
