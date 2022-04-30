import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormInputFieldProps } from './types';
import { FormInput } from './input';
import { FormLabel } from '../label';
import { FormError } from '../error';
import { Row } from '../../grid';
import { Tooltip } from '../../tooltip';
import { FormInputFieldWrapStyled, FormInputStyled } from './input.styled';

export const FormInputField: FC<FormInputFieldProps> & WithStyle = ({
  m,
  mt,
  mr,
  mb,
  ml,
  p,
  pt,
  pr,
  pb,
  pl,
  ...props
}) => {
  return (
    <FormInputFieldWrapStyled {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl }}>
      {props.label && props.tooltip ? (
        <Row>
          <FormLabel ml={15} mr={10} required={props.required}>
            {props.label}
          </FormLabel>
          <Tooltip isButton={true} direction="up" content={props.tooltip} />
        </Row>
      ) : (
        <FormLabel required={props.required}>{props.label}</FormLabel>
      )}
      <FormInput {...props} />
      <FormError name={props.name} />
    </FormInputFieldWrapStyled>
  );
};

FormInputField.defaultProps = {
  measure: 'md',
  type: 'text',
  disabled: false,
  required: false,
  placeholder: 'Enter',
};

FormInputField.displayName = 'FormInputField';
FormInputField.Style = FormInputStyled;
