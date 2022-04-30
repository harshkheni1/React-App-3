import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormCheckboxContainer } from './container';
import { FormCheckboxIcon } from './icon';
import { FormCheckboxToggle } from './toggle';
import { FormCheckboxLabel } from './label';
import { FormCheckboxFieldProps } from './types';
import { FormCheckboxHidden } from './hidden';

export const FormCheckboxField: FC<FormCheckboxFieldProps> & WithStyle = ({
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
  const { name, id, onValue, offValue, checked, disabled, onChange, toggle, color, className } = props;
  return (
    <FormCheckboxContainer {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl, id, name, className }}>
      <FormCheckboxHidden {...{ name, id, onValue, offValue, checked, disabled, onChange, color }} />
      <FormCheckboxLabel {...props}>
        {toggle ? <FormCheckboxToggle /> : <FormCheckboxIcon />}
        {props.label}
      </FormCheckboxLabel>
    </FormCheckboxContainer>
  );
};

FormCheckboxField.defaultProps = {
  required: false,
  color: 'white',
  measure: 'md',
};

FormCheckboxField.displayName = 'FormCheckboxField';
