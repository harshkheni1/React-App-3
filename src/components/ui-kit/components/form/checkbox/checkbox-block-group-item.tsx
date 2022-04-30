import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormCheckboxGroupItemProps } from './types';
import { FormCheckboxContainer } from './container';
import { FormCheckboxHiddenItemStyled } from './hidden';
import { FormCheckboxLabelBlock } from './label-block';

export const FormCheckboxBlockGroupItem: FC<FormCheckboxGroupItemProps> & WithStyle = (props) => {
  const { value, onChange, variant, label, m, mt, mr, mb, ml, p, pt, pr, pb, pl, inline, measure } = props;

  return (
    <FormCheckboxContainer {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl, inline }}>
      <FormCheckboxHiddenItemStyled $variant={variant} {...{ value, onChange }} />
      <FormCheckboxLabelBlock color="white" {...{ measure, variant }}>
        {label}
      </FormCheckboxLabelBlock>
    </FormCheckboxContainer>
  );
};

FormCheckboxBlockGroupItem.defaultProps = {
  variant: 'outlined',
  inline: true,
};
