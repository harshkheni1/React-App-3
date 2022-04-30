import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormTextAreaProps } from './types';
import { FormTextAreaStyled, FormTextAreaWrapStyled, FormTextAreaButtonStyled } from './textarea.styled';
import { Icon } from '../../icon';

export const FormTextArea: FC<FormTextAreaProps> & WithStyle = (props) => {
  const { maxLength, placeholder, name, id, disabled, rows, clearable, measure, onChange } = props;
  return (
    <FormTextAreaWrapStyled>
      <FormTextAreaStyled {...{ maxLength, placeholder, name, id, disabled, rows, clearable, measure, onChange }} />
      {props.clearable && (
        <FormTextAreaButtonStyled>
          <Icon name="close" measure={8} />
        </FormTextAreaButtonStyled>
      )}
    </FormTextAreaWrapStyled>
  );
};

FormTextArea.defaultProps = {
  measure: 'md',
  disabled: false,
  required: false,
  rows: 3,
  placeholder: 'Enter',
  clearable: false,
};

FormTextArea.displayName = 'FormTextArea';
FormTextArea.Style = FormTextAreaStyled;
