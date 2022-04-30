import React, { FC } from 'react';
import { FormTextAreaFieldProps } from './types';
import { FormTextArea } from './textarea';
import { FormLabel } from '../label';
import { FormError } from '../error';
import { WithStyle } from '../../../utils';
import { FormTextAreaStyled, FormTextAreaWrapStyled } from './textarea.styled';
import { SpacingProps } from '../../../const';
import { Row } from '../../grid';
import { Tooltip } from '../../tooltip';

export const FormTextAreaField: FC<FormTextAreaFieldProps & SpacingProps> & WithStyle = (props) => {
  const { tooltip, label, required, name, m, mt, mr, mb, ml, p, pt, pr, pb, pl } = props;
  return (
    <FormTextAreaWrapStyled {...{ m, mt, mr, mb, ml, p, pt, pr, pb, pl }}>
      {label && tooltip ? (
        <Row>
          <FormLabel ml={15} mr={10} required={required}>
            {label}
          </FormLabel>
          <Tooltip isButton={true} direction="up" content={tooltip} />
        </Row>
      ) : (
        <FormLabel required={required}>{label}</FormLabel>
      )}
      <FormTextArea {...props} />
      <FormError name={name} />
    </FormTextAreaWrapStyled>
  );
};

FormTextAreaField.defaultProps = {
  measure: 'md',
  disabled: false,
  required: false,
  rows: 3,
  placeholder: 'Enter',
  clearable: false,
};

FormTextAreaField.displayName = 'FormTextAreaField';
FormTextAreaField.Style = FormTextAreaStyled;
