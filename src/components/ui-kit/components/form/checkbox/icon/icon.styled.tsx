import React, { FC } from 'react';
import { Colors } from '../../../../const';
import { styled } from '../../../../utils';
import { FormCheckboxElementProps } from '../types';
import { FormCheckboxColor, FormCheckboxSize } from '../const';
import { IconStyled } from '../../../icon';

const FormCheckboxIcon: FC<FormCheckboxElementProps> = (props) => {
  const { children, className } = props;
  return <span className={className}>{children}</span>;
};
export const FormCheckboxIconStyled = styled(FormCheckboxIcon)<FormCheckboxElementProps>`
  &,
  ${IconStyled} {
    position: absolute;
    box-sizing: border-box;
    top: 50%;
    left: 0;
  }
  display: block;
  ${IconStyled} {
    display: none;
  }
  ${({ measure, color }) => `
    width: ${FormCheckboxSize[measure].measure - 2}px;
    height: ${FormCheckboxSize[measure].measure - 2}px;
    background-color: ${FormCheckboxColor[color].bg};
    border: 1px solid transparent;
    background-color: ${Colors.white};
    border-color: ${FormCheckboxColor[color].border};
    margin:  -${(FormCheckboxSize[measure].measure - 2) / 2}px 0 0;
    ${IconStyled} {
      margin: -${FormCheckboxSize[measure].checkedIconSize / 2}px 0 0 -${
    FormCheckboxSize[measure].checkedIconSize / 2
  }px;
      left: 50%;
    }
  `}
`;
