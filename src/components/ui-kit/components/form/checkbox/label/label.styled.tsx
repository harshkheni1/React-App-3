import React, { FC } from 'react';
import { styled } from '../../../../utils';
import { TextSize } from '../../../../const';
import { FormCheckboxSize } from '../const';
import { FormCheckboxElementProps, FormCheckboxLabelProps } from '../types';

const FormCheckboxLabelChild: FC<FormCheckboxElementProps> = ({ className, children }) => (
  <span className={className}>{children}</span>
);
export const FormCheckboxLabelStyled = styled(FormCheckboxLabelChild)<
  FormCheckboxElementProps & FormCheckboxLabelProps
>`
  min-height: 20px;
  position: relative;
  font-size: ${TextSize.xs};
  display: block;
  ${({ measure, toggle }) => `
    line-height: ${FormCheckboxSize[measure].measure}px;
    padding-left: ${toggle ? 45 : FormCheckboxSize[measure].measure + FormCheckboxSize[measure].measure / 4}px;
  `}
`;
