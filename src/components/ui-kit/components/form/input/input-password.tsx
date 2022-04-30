import React, { FC, useState } from 'react';
import { CustomField } from 'react-uforms';
import { WithStyle } from '../../../utils';
import { FormInputProps } from './types';
import { FormInput } from './input';
import { FormInputWrapStyled, FormInputEyeStyled } from './input.styled';
import { Icon } from '../../icon';

export const FormInputPassword: FC<FormInputProps> & WithStyle = ({ type, ...props }) => {
  const [passwordType, setPasswordType] = useState(true);
  return (
    <CustomField name={props.name} hideError={true}>
      {({ getValue, setTouched }) => (
        <FormInputWrapStyled>
          <FormInput type={passwordType ? 'password' : 'text'} clearable onBlur={() => setTouched()} {...props} />
          {getValue() && getValue().length > 0 && (
            <FormInputEyeStyled
              onClick={() => {
                setPasswordType(!passwordType);
              }}
            >
              <Icon name="eye" measure={14} color="black" />
            </FormInputEyeStyled>
          )}
        </FormInputWrapStyled>
      )}
    </CustomField>
  );
};

FormInputPassword.displayName = 'FormInputPassword';
