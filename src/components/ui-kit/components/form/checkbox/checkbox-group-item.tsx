import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormCheckboxGroupItemProps } from './types';
import { FormCheckboxContainer } from './container';
import { FormCheckboxHiddenItemStyled } from './hidden';
import { FormCheckboxToggle } from './toggle';
import { FormCheckboxIcon } from './icon';
import { FormCheckboxLabel } from './label';

export const FormCheckboxGroupItem: FC<FormCheckboxGroupItemProps> & WithStyle = (props) => {
  const { value, onChange, label, toggle, m, mt, mr, mb, ml, p, pt, pr, pb, pl, measure } = props;

  return (
    <FormCheckboxContainer {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl }}>
      <FormCheckboxHiddenItemStyled {...{ value, onChange }} />
      <FormCheckboxLabel color="white" {...{ measure, toggle }}>
        {toggle ? <FormCheckboxToggle /> : <FormCheckboxIcon />}
        {label}
      </FormCheckboxLabel>
    </FormCheckboxContainer>
  );
};

FormCheckboxGroupItem.defaultProps = {
  measure: 'md',
};
