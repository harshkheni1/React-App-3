import React, { FC } from 'react';
import { CustomField } from 'react-uforms';
import { FormRadioGroupProps } from './types';
import { SpacingProps } from '../../../const';
import { WithStyle } from '../../../utils/types';

export const FormRadioGroup: FC<FormRadioGroupProps & SpacingProps> & WithStyle = (props) => {
  const { name, value, id, className, disabled, onChange } = props;
  return (
    <CustomField name={name} hideError={true}>
      {({ setValue, getValue, setTouched }) => {
        const values = getValue() ? [...getValue()] : [];
        return (
          <input
            id={id}
            type="radio"
            value={value}
            className={className}
            checked={values[0] === value}
            disabled={disabled}
            onChange={() => {
              let valuesC = getValue() ? [...getValue()] : [];
              const index = valuesC.indexOf(value);

              if (onChange) {
                onChange();
              }

              if (index === -1) {
                valuesC = [value];
              } else {
                return null;
              }

              setValue(valuesC);
              setTimeout(setTouched, 0);
            }}
          />
        );
      }}
    </CustomField>
  );
};
