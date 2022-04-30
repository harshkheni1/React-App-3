import { Colors } from '../../../../const';
import { styled } from '../../../../utils';
import { FormCheckboxElementProps } from '../types';

export const FormCheckboxToggleStyled = styled('span')<FormCheckboxElementProps>`
  width: 34px;
  height: 14px;
  border-radius: 7px;
  background-color: ${Colors.gray300};
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  margin: -7px 0 0;
  cursor: pointer;
  &:after {
    width: 20px;
    height: 20px;
    position: absolute;
    top: -3px;
    border-radius: 50%;
    background-color: ${Colors.gray100};
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.24), 0 0 1px 0 rgba(0, 0, 0, 0.12);
    content: '';
    left: -3px;
    right: auto;
    cursor: pointer;
  }
`;
