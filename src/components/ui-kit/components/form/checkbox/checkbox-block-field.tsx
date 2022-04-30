import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormCheckboxContainer } from './container';
import { FormCheckboxLabelBlock } from './label-block';
import { FormCheckboxFieldProps } from './types';
import { FormCheckboxHidden } from './hidden';

export const FormCheckboxBlockField: FC<FormCheckboxFieldProps> & WithStyle = ({
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
  const { name, id, onValue, offValue, checked, disabled, onChange, variant, color, className, inline } = props;
  return (
    <FormCheckboxContainer {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl, id, name, className, inline }}>
      <FormCheckboxHidden {...{ name, id, onValue, offValue, checked, disabled, onChange, variant, color }} />
      <FormCheckboxLabelBlock {...props}>{props.label}</FormCheckboxLabelBlock>
    </FormCheckboxContainer>
  );
};

FormCheckboxBlockField.defaultProps = {
  required: false,
  color: 'white',
  measure: 'md',
  variant: 'outlined',
};

FormCheckboxBlockField.displayName = 'FormCheckboxBlockField';
