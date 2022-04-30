import React, { FC } from 'react';
import { CustomField } from 'react-uforms';
import { FormCheckboxGroupProps } from './types';
import { SpacingProps } from '../../../const';
import { WithStyle } from '../../../utils/types';

export const FormCheckboxGroup: FC<FormCheckboxGroupProps & SpacingProps> & WithStyle = (props) => {
  const { name, value, id, className, disabled, onChange } = props;
  return (
    <CustomField name={name} hideError={true}>
      {({ setValue, getValue, setTouched }) => {
        const values = getValue() || [];
        return (
          <input
            id={id}
            className={className}
            type="checkbox"
            checked={values.indexOf(value) !== -1}
            value={value}
            disabled={disabled}
            onChange={() => {
              const valuesC = getValue() || [];
              const index = valuesC.indexOf(value);

              if (onChange) {
                onChange();
              }

              if (index === -1) {
                valuesC.push(value);
              } else {
                valuesC.splice(index, 1);
              }
              setValue([...valuesC]);
              setTimeout(setTouched, 0);
            }}
          />
        );
      }}
    </CustomField>
  );
};
