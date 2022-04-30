import React, { FC } from 'react';
import { Text } from 'react-uforms';
import { styled, css, HtmlProps } from '../../../utils';
import {
  FormInputWrapProps,
  FormInputClearProps,
  FormInputStyledAttrProps,
  FormInputProps,
  FormInputHiddenProps,
} from './types';
import {
  FormControlSize,
  formControlBasic,
  formControlSizeVariant,
  formControlColorVariant,
  formControlPlaceholder,
  formControlFocusVariant,
  formControlDisabledVariant,
} from '../const';
import { IconStyled } from '../../icon';
import { Colors, SpacingProps, spacingStyle } from '../../../const';

const FormInputChild: FC<FormInputProps> = ({ clearable, ...props }) => {
  return <Text {...props} hideError={true} />;
};

export const FormInputBasicStyles = css`
  border-radius: 0;

  /* Basic styles */
  ${formControlBasic};

  /* Color variations */
  ${formControlColorVariant()};

  /* Placeholder customization */
  ${formControlPlaceholder};

  /* Focus state */
  ${formControlFocusVariant};

  /* Disabled state */
  ${formControlDisabledVariant};
`;

export const FormInputStyled = styled(FormInputChild)<FormInputStyledAttrProps>`
  height: ${({ measure }) => `${FormControlSize[measure].height}px`};
  ${FormInputBasicStyles}
  /* Size variations */
  transition:all 0.3s ease 0s;
  ${({ measure }) => formControlSizeVariant(measure)}
  ${({ clearable }) => (clearable ? 'padding-right: 40px;' : '')}
  ${({ $variant }) =>
    $variant === 'line'
      ? css`
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          padding-left: 0;
          padding-right: 0;
          &:focus {
            outline: none;
          }
        `
      : ''}
      &:focus {
            outline: none;
            box-shadow: none;
            border-width:1px;
          }
          &::-ms-reveal,
          &::-ms-clear {
            display: none;
          }
  &::placeholder { /* Most modern browsers support this now. */
   ${({ placeholder }) => (placeholder == 'Required' ? `color: ${Colors.red}` : '')}
}
`;

export const FormInputHiddenStyled = styled('input')<FormInputHiddenProps>`
  height: ${({ measure }) => FormControlSize[measure].height}px;
  ${FormInputBasicStyles}
  /* Size variations */
  ${({ measure }) => formControlSizeVariant(measure)}
`;

export const FormInputRawStyles = css`
  height: ${FormControlSize.md.height}px;
  ${FormInputBasicStyles}
  /* Size variations */
  ${formControlSizeVariant('md')}
`;

export const FormInputRawStyled = styled('input')`
  ${FormInputRawStyles}
`;

export const FormInputRawWrapStyled = styled('div')`
  input {
    ${FormInputRawStyles}
  }
`;

const FormInputWrapChild: FC<FormInputWrapProps> = (props) => {
  const { className, children } = props;
  return <div className={className}>{children}</div>;
};
export const FormInputWrapStyled = styled(FormInputWrapChild)<FormInputWrapProps>`
  position: relative;
  ${(props) => spacingStyle(props)}
  > ${IconStyled} {
    position: absolute;
    margin: -11px 0 0;
    top: 50%;
    right: 15px;
    opacity: 0;
    z-index: -1;
    transition: 0.3s;
  }
`;

export const FormInputFieldWrapStyled = styled('div')<SpacingProps>`
  position: relative;
  ${(props) => spacingStyle(props)}
`;

export const FormInputClearChild: FC<FormInputClearProps> = ({ className, onClick, children }) => (
  <button {...{ className, onClick }} type="button" tabIndex={-1}>
    {children}
  </button>
);
export const FormInputClearStyled = styled(FormInputClearChild)<FormInputClearProps>`
  width: 22px;
  height: 22px;
  background-color: ${Colors.transparent};
  position: absolute;
  border: none;
  padding: 5px;
  top: 50%;
  right: 14px;
  margin: -11px 0 0;
  line-height: 8px;
  cursor: pointer;
  &:hover,
  &:focus {
    outline: none;
    background-color: ${Colors.transparent};
  }
`;

export const FormInputEyeChild: FC<HtmlProps<HTMLButtonElement>> = ({ className, onClick, children }) => (
  <button {...{ className, onClick }} type="button" tabIndex={-1}>
    {children}
  </button>
);

export const FormInputEyeStyled = styled(FormInputEyeChild)`
  width: 22px;
  height: 14px;
  background-color: ${Colors.transparent};
  position: absolute;
  border: none;
  padding: 0;
  top: 50%;
  transform: translateY(-50%);
  right: 14px;
  line-height: 8px;
  cursor: pointer;
  &:hover,
  &:focus {
    outline: none;
    background-color: ${Colors.transparent};
  }
`;
