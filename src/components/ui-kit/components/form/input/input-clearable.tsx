import React, { FC } from 'react';
import { CustomField } from 'react-uforms';
import { WithStyle } from '../../../utils';
import { FormInputClearableProps } from './types';
import { FormInput } from './input';
import { FormInputWrapStyled, FormInputClearStyled } from './input.styled';
import { Icon } from '../../icon';
import { FormError } from '../error';

export const FormInputClearable: FC<FormInputClearableProps> & WithStyle = ({ onClear, ...props }) => {
  return (
    <CustomField name={props.name} hideError={true}>
      {({ setValue, getValue, setTouched }) => (
        <FormInputWrapStyled>
          <FormInput clearable onBlur={() => setTouched()} {...props} />
          {getValue() && getValue().length > 0 && (
            <FormInputClearStyled
              onClick={() => {
                if (onClear) {
                  onClear();
                }
                setValue('');
              }}
            >
              <Icon name="close" measure={12} color="black" />
            </FormInputClearStyled>
          )}
          <FormError name={props.name} />
        </FormInputWrapStyled>
      )}
    </CustomField>
  );
};

FormInputClearable.defaultProps = {
  type: 'text',
};

FormInputClearable.displayName = 'FormInputClearable';
