import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { LabelProps } from './types';
import { FormLabelStyled } from './label.styled';

export const FormLabel: FC<LabelProps> & WithStyle = React.memo(
  React.forwardRef((props, ref) => {
    return (
      <FormLabelStyled ref={ref} {...props}>
        {props.children}
      </FormLabelStyled>
    );
  }),
);

FormLabel.defaultProps = {
  measure: 'sm',
  as: 'label',
};

FormLabel.displayName = 'FormLabel';
FormLabel.Style = FormLabelStyled;
