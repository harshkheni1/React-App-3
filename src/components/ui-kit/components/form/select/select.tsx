import React, { FC } from 'react';
import { OptionTypeBase } from 'react-select';
import { CustomField, Select } from 'react-uforms';
import { WithStyle } from '../../../utils/types';
import { FormSelectProps } from './types';
import { FormMobileSelectStyled, FormSelectStyled } from './select.styled';
import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  NoOptionsMessage,
  OptionBasic,
  OptionLocation,
  OptionMultiple,
} from './select-elements';
import { Icon } from '../../icon';

export const FormSelect: FC<FormSelectProps> & WithStyle = (props) => {
  const {
    name,
    disabled,
    required,
    options,
    isMulti,
    isClearable,
    instanceId,
    onChange,
    placeholder,
    location,
    onBlur,
    isMobile,
    size,
    hideError,
  } = props;
  const Option = (location && OptionLocation) || (isMulti && OptionMultiple) || OptionBasic;
  const getFormattedValue = (inputValue: string, options: OptionTypeBase[]): OptionTypeBase => {
    const index = options.findIndex((option) => option.value === inputValue);
    return index !== -1 ? options[index] : { label: inputValue, value: inputValue };
  };
  const formatDefaultValues = (inputValue: string[] | string, options: any): OptionTypeBase[] | OptionTypeBase => {
    if (Array.isArray(inputValue)) {
      return inputValue.map((item) => getFormattedValue(item, options));
    }
    return getFormattedValue(inputValue, options);
  };
  const mobileOptions = (newOptions: any): any => {
    const optionsWithPlaceholder =
      placeholder && isClearable ? [{ label: placeholder, name: placeholder, value: null }, ...newOptions] : newOptions;
    if (Array.isArray(optionsWithPlaceholder)) {
      return optionsWithPlaceholder.map((o) => ({
        name: o.label,
        value: o.value,
        disabled: o.disabled,
      }));
    } else {
      return [{ name: optionsWithPlaceholder.label, value: optionsWithPlaceholder.value }];
    }
  };
  const getMobileValue = (value: string, newOptions: any, placeholder: any) => {
    if (!value) {
      return { label: placeholder || null, value: null };
    }
    const label = Array.isArray(newOptions) ? newOptions.find((o) => o.value === value).label : newOptions.label;
    return { label, value };
  };
  if (isMobile) {
    return (
      <FormMobileSelectStyled {...{ hideError }}>
        <Icon name="angle" measure={8} color="gray800" />
        <Select
          multiple={isMulti}
          options={mobileOptions(options)}
          onChange={(event, action?: any) => {
            if (onChange) {
              onChange(
                getMobileValue(JSON.parse((event.target as HTMLTextAreaElement).value)['v'], options, placeholder),
                action,
              );
            }
          }}
          {...{ name, required, disabled, size, onBlur, hideError }}
        />
      </FormMobileSelectStyled>
    );
  }

  return (
    <CustomField name={name} hideError={hideError}>
      {({ getValue, setValue, getErrors, setTouched }) => {
        return (
          <FormSelectStyled
            components={{ DropdownIndicator, ClearIndicator, NoOptionsMessage, Option, MultiValueRemove }}
            isDisabled={disabled}
            isCreatable={false}
            value={getValue() ? formatDefaultValues(getValue(), options) : undefined}
            hideSelectedOptions={false}
            menuPlacement="auto"
            onChange={(newValue: any, action: any) => {
              let value = undefined;
              if (newValue) {
                value = Array.isArray(newValue) ? newValue.map((item) => item.value) : newValue.value;
              }
              setValue(value, () => {
                if (onChange) {
                  onChange(newValue, action);
                }
              });
            }}
            onBlur={(event: any) => {
              if (onBlur) {
                onBlur(event);
              }
              setTouched();
            }}
            className={`react-select-container ${location ? 'react-select-location' : ''}`}
            classNamePrefix="react-select"
            instanceId={instanceId || name}
            error={Array.isArray(getErrors()) && getErrors().length > 0}
            {...{ name, required, options, isMulti, placeholder, isClearable }}
          />
        );
      }}
    </CustomField>
  );
};

FormSelect.defaultProps = {
  hideError: false,
};

FormSelect.displayName = 'FormSelect';
