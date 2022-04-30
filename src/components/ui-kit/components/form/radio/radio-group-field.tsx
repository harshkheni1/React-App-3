import React, { FC, Fragment } from 'react';
import { RadioGroup } from 'react-uforms';
import { WithStyle } from '../../../utils';
import { FormLabel } from '../label';
import { FormError } from '../error';
import { FormRadioGroupFieldProps } from './types';

export const FormRadioGroupField: FC<FormRadioGroupFieldProps> & WithStyle = (props) => {
  const { name, label, children } = props;

  return (
    <Fragment>
      {label && <FormLabel mb={15}>{label}</FormLabel>}
      <RadioGroup name={name} hideError={true}>
        {children}
      </RadioGroup>
      <FormError name={name} />
    </Fragment>
  );
};
