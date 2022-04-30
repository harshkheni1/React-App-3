import React, { FC } from 'react';
import { FormSelectProps } from './types';
import { WithStyle } from '../../../utils';
import { FormSelectStyled } from './select.styled';
import { CustomField } from 'react-uforms';
import {
  DropdownIndicator,
  ClearIndicator,
  NoOptionsMessage,
  MultiValueRemove,
  OptionMultiple,
} from './select-elements';

export const FormSelectCreatable: FC<FormSelectProps> & WithStyle = (props) => {
  const {
    name,
    disabled,
    required,
    options,
    onChange,
    instanceId,
    placeholder,
    optionIcon,
    onBlur,
    isMulti,
    isClearable,
  } = props;
  const Option = OptionMultiple;
  return (
    <CustomField {...{ name }} hideError={true}>
      {({ getValue, setValue, setTouched }) => (
        <FormSelectStyled
          components={{ DropdownIndicator, ClearIndicator, NoOptionsMessage, Option, MultiValueRemove }}
          isCreatable={true}
          hideSelectedOptions={false}
          isDisabled={disabled}
          value={getValue()}
          className="react-select-container"
          classNamePrefix="react-select-creatable"
          menuPlacement="auto"
          onChange={(value: any, action: any) => {
            setValue(value);
            if (onChange) {
              onChange(value, action);
            }
          }}
          onBlur={() => setTouched()}
          instanceId={instanceId || name}
          {...{ name, required, options, placeholder, optionIcon, onBlur, isMulti, isClearable }}
        />
      )}
    </CustomField>
  );
};

FormSelectCreatable.defaultProps = {
  isMulti: true,
};

FormSelectCreatable.displayName = 'FormSelectCreatable';
