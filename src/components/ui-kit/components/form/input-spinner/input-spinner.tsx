import { WithStyle } from '../../../utils/types';
import React, { FC, useState } from 'react';
import { InputSpinnerProps } from './types';
import { InputSpinnerControlStyled, InputSpinnerStyled, InputSpinnerWrapStyled } from './input-spinner.styled';
import { Icon } from '../../../';

export const InputSpinner: FC<InputSpinnerProps> & WithStyle = (props) => {
  const { defaultValue, max, min, step, onChange, measure, ...rest } = props;
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e: any) => {
    if (onChange) {
      onChange(e);
    }
  };
  const handleClick = (e: number) => {
    setValue(e);
    handleChange(e);
  };

  return (
    <InputSpinnerWrapStyled>
      <InputSpinnerControlStyled
        onClick={() => handleClick(value - step)}
        color="gray500"
        type="button"
        variant={measure === 'md' ? 'outlined' : 'link'}
        disabled={value - step < min}
      >
        <Icon name="minus-thin" measure={40} />
      </InputSpinnerControlStyled>
      <InputSpinnerStyled
        {...rest}
        value={value}
        measure={measure}
        type="number"
        onChange={(e: any) => {
          handleChange(e);
        }}
      />
      <InputSpinnerControlStyled
        onClick={() => handleClick(value + step)}
        color="gray500"
        type="button"
        variant={measure === 'md' ? 'outlined' : 'link'}
        disabled={value + step > max}
      >
        <Icon name="plus-thin" measure={40} />
      </InputSpinnerControlStyled>
    </InputSpinnerWrapStyled>
  );
};

InputSpinner.displayName = 'InputSpinner';
InputSpinner.Style = InputSpinnerStyled;
InputSpinner.defaultProps = {
  readOnly: true,
  type: 'number',
  defaultValue: 1,
  step: 1,
  measure: 'md',
};
