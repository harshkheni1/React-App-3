import React, { FC } from 'react';
import { styled } from '../../../../utils';
import { Colors, TextSize } from '../../../../const';
import { FormRadioElementProps } from '../types';

const FormRadioBlockChild: FC<Pick<FormRadioElementProps, 'className' | 'children'>> = (props) => {
  const { className, children } = props;
  return <span {...{ className }}>{children}</span>;
};
export const FormRadioBlockStyled = styled(FormRadioBlockChild)<FormRadioElementProps>`
  font-size: ${TextSize.sm};
  text-align: center;
  border: 1px solid ${Colors.gray700};
  color: ${Colors.gray800};
  padding: 15px 12px;
  line-height: 20px;
  box-sizing: border-box;
  display: block;
  cursor: pointer;
  margin-left: -1px;
  font-weight: 600;
  &:hover {
    color: ${Colors.primary};
  }
`;
