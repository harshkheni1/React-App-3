import React, { FC } from 'react';
import { FormTextAreaProps } from './types';
import { styled } from '../../../utils';
import { TextArea } from 'react-uforms';
import { Colors, SpacingProps, spacingStyle } from '../../../const';
import {
  formControlBasic,
  formControlSizeVariant,
  formControlColorVariant,
  formControlPlaceholder,
  formControlFocusVariant,
  formControlDisabledVariant,
} from '../const';
import { IconStyled } from '../../icon';
import { FormTextAreaWrapProps, FormTextAreaButtonProps } from './types';

const FormTextAreaChildren: FC<FormTextAreaProps> = (props) => {
  const { maxLength, name, id, placeholder, className, onChange } = props;
  return <TextArea {...{ maxLength, name, id, placeholder, className, onChange }} hideError={true} />;
};
export const FormTextAreaStyled = styled(FormTextAreaChildren)<FormTextAreaProps>`
  /* Basic styles */
  ${formControlBasic}

  /* Size variations */
  ${({ measure }) => formControlSizeVariant(measure)}
  padding-right: 32px;

  /* Color variations */
  ${formControlColorVariant()}

  /* Placeholder customization */
  ${formControlPlaceholder}

  /* Focus state */
  ${formControlFocusVariant}

  /* Disabled state */
  ${formControlDisabledVariant}

  resize: none;
  &::placeholder { /* Most modern browsers support this now. */
   ${({ placeholder }) => (placeholder == 'Required' ? `color: ${Colors.red}` : '')}
}
`;

const FormTextAreaButtonChild: FC<FormTextAreaButtonProps> = (props) => {
  const { className, onClick, disabled, children } = props;
  return <button {...{ className, onClick, disabled }}>{children}</button>;
};
export const FormTextAreaButtonStyled = styled(FormTextAreaButtonChild)`
  width: 22px;
  padding: 10px 5px;
  top: 1px;
  right: 1px;
  bottom: 1px;
  position: absolute;
  display: block;
  border: none;
  cursor: pointer;
  z-index: 1;
  text-align: center;
  background-color: ${Colors.secondaryLight};

  ${IconStyled} {
    display: block;
    margin: 0 auto;
  }
`;

const FormTextAreaWrapChild: FC<FormTextAreaWrapProps> = (props) => {
  const { className, children } = props;
  return <div className={className}>{children}</div>;
};
export const FormTextAreaWrapStyled = styled(FormTextAreaWrapChild)<FormTextAreaWrapProps & SpacingProps>`
  position: relative;
  ${(props) => spacingStyle(props)}
`;
