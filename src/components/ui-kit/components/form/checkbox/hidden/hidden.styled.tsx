import React, { FC } from 'react';
import { Checkbox, CheckboxGroupItem, CheckboxGroupItemProps } from 'react-uforms';
import { styled, css } from '../../../../utils';
import { Colors } from '../../../../const';
import { IconStyled } from '../../../icon';
import { FormCheckboxColor, FormCheckboxDisabled } from '../const';
import { FormCheckboxLabelBlockStyled, labelBlockVariant } from '../label-block';
import {
  FormCheckboxCustomStyledAttrProps,
  FormCheckboxProps,
  FormCheckboxRawProps,
  FormCheckboxRawStyledAttrProps,
} from '../types';
import { FormCheckboxLabelStyled } from '../label';
import { FormCheckboxIconStyled } from '../icon';
import { FormCheckboxToggleStyled } from '../toggle';
import { FormCheckboxLabelPlanStyled } from '../label-plan';

export const FormCheckboxHiddenBasicStyles = css`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  opacity: 0;
`;
export const FormCheckboxHiddenSecondaryStyles = css`
  &:focus {
    ~ ${FormCheckboxLabelStyled} {
      ${FormCheckboxIconStyled} {
        box-shadow: 0 0 0 2px rgba(0, 103, 244, 0.5);
      }
    }
  }
  &:disabled ~ ${FormCheckboxLabelStyled} {
    ${FormCheckboxIconStyled} {
      background-color: ${FormCheckboxDisabled.bg};
      border-color: ${FormCheckboxDisabled.border};
    }
  }
`;

export const FormCheckboxHiddenItemStyled = styled(CheckboxGroupItem)<
  CheckboxGroupItemProps & FormCheckboxCustomStyledAttrProps
>`
  /* stylelint-disable */
  &:checked {
    ~ {
      ${FormCheckboxLabelStyled}, ${FormCheckboxLabelPlanStyled} {
        ${FormCheckboxIconStyled} {
          background-color: ${FormCheckboxColor.white.checkedBg};
          border-color: ${FormCheckboxColor.white.checkedBorder};
        }
        ${IconStyled} {
          display: block;
          * {
            fill: ${FormCheckboxColor.white.checkedColor};
          }
        }
        ${FormCheckboxToggleStyled} {
          background-color: rgba(232, 24, 76, 0.5);
          &:after {
            background-color: ${Colors.primary};
            left: auto;
            right: -3px;
          }
        }
      }
      ${FormCheckboxLabelBlockStyled} {
        ${({ $variant }) => $variant && labelBlockVariant($variant, 2)}
      }
    }
  }
  ${FormCheckboxHiddenBasicStyles}
  ${FormCheckboxHiddenSecondaryStyles}
`;

const FormCheckboxHiddenRawChild: FC<FormCheckboxRawProps> = (props) => <input type="checkbox" {...props} />;

export const FormCheckboxHiddenRawStyled = styled(FormCheckboxHiddenRawChild)<FormCheckboxRawStyledAttrProps>`
  &:checked {
    ~ ${FormCheckboxLabelStyled} {
      ${({ $color }) => `
        ${FormCheckboxIconStyled} {
          background-color: ${FormCheckboxColor[$color].checkedBg};
          border-color: ${FormCheckboxColor[$color].checkedBorder};
        }
        ${IconStyled} {
          display: block;
          * {
            fill: ${FormCheckboxColor[$color].checkedColor};
          }
        }
      `}
      ${FormCheckboxToggleStyled} {
        background-color: rgba(232, 24, 76, 0.5);
        &:after {
          background-color: ${Colors.primary};
          left: auto;
          right: -3px;
        }
      }
    }
  }
  ${FormCheckboxHiddenBasicStyles}
  ${FormCheckboxHiddenSecondaryStyles}
`;

const FormCheckboxHiddenChild: FC<FormCheckboxProps> = (props) => {
  const { name, id, required, disabled, onValue, offValue, checked, className, onChange } = props;
  return (
    <Checkbox {...{ name, id, required, disabled, onValue, offValue, checked, className, onChange }} hideError={true} />
  );
};

export const FormCheckboxHiddenStyled = styled(FormCheckboxHiddenChild)<FormCheckboxProps>`
  &:checked {
    ~ {
      ${FormCheckboxLabelStyled} {
        ${({ color }) => `
          ${FormCheckboxIconStyled} {
            background-color: ${FormCheckboxColor[color].checkedBg};
            border-color: ${FormCheckboxColor[color].checkedBorder};
          }
          ${IconStyled} {
            display: block;
            * {
              fill: ${FormCheckboxColor[color].checkedColor};
            }
          }
        `}
        ${FormCheckboxToggleStyled} {
          background-color: rgba(232, 24, 76, 0.5);
          &:after {
            background-color: ${Colors.primary};
            left: auto;
            right: -3px;
          }
        }
      }
      ${FormCheckboxLabelBlockStyled} {
        ${({ variant }) => variant && labelBlockVariant(variant, 2)}
      }
    }
  }
  ${FormCheckboxHiddenBasicStyles}
  ${FormCheckboxHiddenSecondaryStyles}
`;

export const FormCheckboxHiddenPlanItemStyled = styled(CheckboxGroupItem)<
  CheckboxGroupItemProps & FormCheckboxCustomStyledAttrProps
>`
  ~ ${FormCheckboxLabelPlanStyled} {
    ${FormCheckboxIconStyled} {
      left: 22px;
      border-color: ${Colors.primary};
    }
  }
  /* stylelint-disable */
  &:checked {
    ~ {
      ${FormCheckboxLabelPlanStyled} {
        background: ${Colors.gray200};
        ${FormCheckboxIconStyled} {
          background-color: ${Colors.primary};
        }
        ${IconStyled} {
          display: block;
          * {
            fill: ${FormCheckboxColor.white.checkedColor};
          }
        }
      }
    }
  }
  ${FormCheckboxHiddenBasicStyles};
  ${FormCheckboxHiddenSecondaryStyles};
`;
