import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormCheckboxContainer } from './container';
import { FormCheckboxHiddenRawStyled } from './hidden';
import { FormCheckboxIcon } from './icon';
import { FormCheckboxToggle } from './toggle';
import { FormCheckboxLabel } from './label';
import { FormCheckboxRawFieldProps } from './types';

export const FormCheckboxRawField: FC<FormCheckboxRawFieldProps> & WithStyle = ({
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
  const { name, id, checked, disabled, onChange, toggle, color, className } = props;
  return (
    <FormCheckboxContainer {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl, id, name, className }}>
      <FormCheckboxHiddenRawStyled $color={color} {...{ name, id, checked, disabled, onChange }} />
      <FormCheckboxLabel {...props}>
        {toggle ? <FormCheckboxToggle /> : <FormCheckboxIcon />}
        {props.label}
      </FormCheckboxLabel>
    </FormCheckboxContainer>
  );
};

FormCheckboxRawField.defaultProps = {
  required: false,
  color: 'white',
  measure: 'md',
};

FormCheckboxRawField.displayName = 'FormCheckboxRawField';
