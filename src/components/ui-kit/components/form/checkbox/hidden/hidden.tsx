import React, { FC } from 'react';
import { WithStyle } from '../../../../utils';
import { FormCheckboxProps } from '../types';
import { FormCheckboxHiddenStyled } from './hidden.styled';

export const FormCheckboxHidden: FC<FormCheckboxProps> & WithStyle = (props) => {
  const { name, id, required, disabled, checked, color, measure, onValue, offValue, onChange, variant } = props;
  return (
    <FormCheckboxHiddenStyled
      {...{ name, required, disabled, checked, color, measure, onValue, offValue, onChange, variant }}
      id={id || name}
    />
  );
};

FormCheckboxHidden.defaultProps = {
  required: false,
  color: 'white',
  measure: 'md',
};

FormCheckboxHidden.displayName = 'FormCheckboxHidden';
