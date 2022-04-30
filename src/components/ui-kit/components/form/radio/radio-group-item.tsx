import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormRadioGroupItemFieldProps } from './types';
import { FormRadioContainer, FormRadioContainerStyled } from './container';
import { FormRadioHiddenRawStyled } from './hidden';
import { FormRadioLabel } from './label';
import { RadioGroupItemProps } from 'react-uforms';

export const FormRadioGroupItem: FC<RadioGroupItemProps> & WithStyle = (props) => {
  const { value } = props;

  return <FormRadioHiddenRawStyled value={value} />;
};

export const FormRadioGroupItemField: FC<FormRadioGroupItemFieldProps> & WithStyle = (props) => {
  const { value, color, label, planStyle, m, mt, mr, mb, ml, p, pt, pr, pb, pl } = props;

  return (
    <FormRadioContainer {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl }}>
      <FormRadioGroupItem value={value} />
      <FormRadioLabel {...{ color, planStyle }}>{label}</FormRadioLabel>
    </FormRadioContainer>
  );
};

FormRadioGroupItemField.defaultProps = {
  color: 'primary',
  planStyle: false,
};

FormRadioGroupItem.displayName = 'FormRadioGroupItem';
FormRadioGroupItem.Style = FormRadioHiddenRawStyled;

FormRadioGroupItemField.displayName = 'FormRadioGroupItemField';
FormRadioGroupItemField.Style = FormRadioContainerStyled;
