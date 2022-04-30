import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormRadioFieldProps } from './types';
import { FormRadioContainer } from './container';
import { FormRadio } from './radio';
import { FormRadioLabel } from './label';
import { FormRadioBlock } from './block';

export const FormRadioField: FC<FormRadioFieldProps> & WithStyle = ({
  color,
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
  const { block, label, name, id, value, checked, disabled, onChange, as } = props;
  return (
    <FormRadioContainer {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl, block, name, id, as }}>
      <FormRadio {...{ name, id, value, checked, disabled, block, onChange }} />
      {block ? (
        <FormRadioBlock {...props}>{label}</FormRadioBlock>
      ) : (
        <FormRadioLabel color={color}>{label}</FormRadioLabel>
      )}
    </FormRadioContainer>
  );
};

FormRadioField.displayName = 'FormRadioField';
