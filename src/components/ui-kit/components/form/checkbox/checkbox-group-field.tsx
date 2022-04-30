import React, { FC, Fragment } from 'react';
import { CheckboxGroup } from 'react-uforms';
import { WithStyle } from '../../../utils';
import { FormLabel } from '../label';
import { FormError } from '../error';
import { FormCheckboxGroupFieldProps } from './types';

export const FormCheckboxGroupField: FC<FormCheckboxGroupFieldProps> & WithStyle = (props) => {
  const { name, label, children, hideError, onChange } = props;

  return (
    <Fragment>
      {label && <FormLabel mb={15}>{label}</FormLabel>}
      <CheckboxGroup {...{ name, onChange }} hideError={true}>
        {children}
      </CheckboxGroup>
      {!hideError && <FormError name={name} />}
    </Fragment>
  );
};

FormCheckboxGroupField.defaultProps = {
  hideError: false,
};
