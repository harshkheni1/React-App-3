import React from 'react';
import { styled } from '../../../../utils';
import { Colors } from '../../../../const';
import { FormCheckboxElementProps, FormCheckboxLabelProps } from '../types';

export const FormCheckboxLabelPlanStyled = styled('div')<FormCheckboxElementProps & FormCheckboxLabelProps>`
  padding: 15px 15px 15px 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  background: ${Colors.white};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  min-height: 100px;
`;
