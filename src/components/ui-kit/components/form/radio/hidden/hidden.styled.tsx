import React, { FC } from 'react';
import { Radio, RadioGroupItem, RadioGroupItemProps } from 'react-uforms';
import { styled, css } from '../../../../utils';
import { Colors } from '../../../../const';
import { FormRadioProps } from '../types';
import { FormRadioLabelStyled } from '../label';
import { FormRadioBlockStyled } from '../block';

const FormRadioHiddenStyles = css`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  opacity: 0;
  &:disabled {
    ~ ${FormRadioLabelStyled} {
      &:before {
        border-color: ${Colors.gray300};
      }
    }
    ~ ${FormRadioBlockStyled} {
      border-color: ${Colors.gray300};
      color: ${Colors.gray300};
    }
  }
  &:focus {
    ~ ${FormRadioLabelStyled} {
      &:before {
        box-shadow: 0 0 0 2px rgba(0, 103, 244, 0.5);
      }
    }
  }
  &:checked {
    ~ ${FormRadioLabelStyled} {
      &:after {
        display: block;
      }
    }
    ~ ${FormRadioBlockStyled} {
      background-color: ${Colors.secondary};
    }

    &:disabled {
      ~ ${FormRadioLabelStyled} {
        &:after {
          background-color: ${Colors.gray300};
        }
      }
      ~ ${FormRadioBlockStyled} {
        background-color: ${Colors.gray200};
        color: ${Colors.gray500};
      }
    }
  }
`;

const FormRadioHiddenChild: FC<FormRadioProps> = (props) => {
  const { name, id, value, checked, disabled, className, onChange } = props;
  return <Radio {...{ name, id, value, checked, disabled, className, onChange }} hideError={true} />;
};

export const FormRadioHiddenRawStyled = styled(RadioGroupItem)<RadioGroupItemProps>`
  display: none;
`;

export const FormRadioHiddenStyled = styled(FormRadioHiddenChild)<FormRadioProps>`
  ${FormRadioHiddenStyles}
`;
