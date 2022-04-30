import React, { FC } from 'react';
import { styled, uppercase } from '../../../../utils';
import { Colors, TextSize } from '../../../../const';
import { FormRadioElementProps } from '../types';

const FormRadioLabelChild: FC<Pick<FormRadioElementProps, 'className' | 'children'>> = (props) => {
  const { className, children } = props;
  return <span {...{ className }}>{children}</span>;
};
export const FormRadioLabelStyled = styled(FormRadioLabelChild)<FormRadioElementProps>`
  position: relative;
  font-size: ${TextSize.xs};
  line-height: 18px;
  padding-left: 25px;
  display: block;
  cursor: pointer;
  ${(props) =>
    props.planStyle &&
    `
      text-transform: uppercase;
      font-size: ${TextSize.lg};
      letter-spacing: 2px;
      font-weight: 600;
      line-height: 22px;
  `};
  &:before,
  &:after {
    position: absolute;
    content: '';
    box-sizing: border-box;
    top: 50%;
    border-radius: 50%;
  }
  &:before {
    width: 18px;
    height: 18px;
    border: 1px solid
      ${({ color }) => (color === 'primary' && Colors.primary) || (color === 'gray800' && Colors.gray800)};
    background-color: ${Colors.white};
    display: block;
    left: 0;
    margin: -9px 0 0;
  }
  &:after {
    width: 8px;
    height: 8px;
    left: 5px;
    margin: -4px 0 0;
    background: ${({ color }) => (color === 'primary' && Colors.primary) || (color === 'gray800' && Colors.gray800)};
    display: none;
  }
`;
