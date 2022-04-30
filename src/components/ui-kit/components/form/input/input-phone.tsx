import React, { FC, useState } from 'react';
import { WithStyle } from '../../../utils';
import { FormInputPhoneProps } from './types';
import { FormInputHiddenStyled } from './input.styled';
import { CustomField, Text } from 'react-uforms';

export const FormInputPhone: FC<FormInputPhoneProps> & WithStyle = (props) => {
  const { name, id, disabled, mask, required, measure, placeholder, type, onChange, hideError } = props;

  const validateInt = (event: any) => {
    return (
      (event.charCode >= 48 && event.charCode <= 57) ||
      event.keyCode == 9 ||
      event.keyCode == 10 ||
      event.keyCode == 13 ||
      event.keyCode == 8 ||
      event.keyCode == 116 ||
      event.keyCode == 46 ||
      (event.keyCode <= 40 && event.keyCode >= 37)
    );
  };

  const handleChange = (value: string, callback?) => {
    const myNumbers = [];
    let myOutPut = '';
    let theLastPos = 1;
    //get numbers
    for (let i = 0; i < value.length; i++) {
      if (!isNaN(+value.charAt(i)) && value.charAt(i) != ' ') {
        myNumbers.push(value.charAt(i));
      }
    }
    //write over mask
    for (let j = 0; j < mask.length; j++) {
      if (mask.charAt(j) == '_') {
        //replace "_" by a number
        if (myNumbers.length == 0) myOutPut = myOutPut + mask.charAt(j);
        else {
          myOutPut = myOutPut + myNumbers.shift();
          theLastPos = j + 1; //set caret position
        }
      } else {
        myOutPut = myOutPut + mask.charAt(j);
        if (!myOutPut.includes('_') && callback) {
          callback();
        }
      }
    }

    return {
      val: myOutPut,
      cursor: theLastPos,
    };
  };
  return (
    <CustomField name={name} hideError={hideError}>
      {({ setValue, setTouched, getValue }) => {
        const myValue = getValue() || '';
        return (
          <>
            <Text {...{ name, id, disabled, type, required, hideError }} hidden />
            <FormInputHiddenStyled
              {...{ disabled, measure, placeholder, required }}
              name={`${name}_fake`}
              type="text"
              value={myValue}
              onChange={(event: any) => {
                const value = handleChange(event.target.value, setTouched()).val;

                setValue(value);
                // setValue(value.replace(/[^0-9]/g, ''));

                if (onChange) {
                  onChange(event);
                }
              }}
              onBlur={(event) => {
                event.persist();
                setTouched();
              }}
              onKeyUp={(event) => {
                const cursor = handleChange(myValue).cursor;
                event.currentTarget.setSelectionRange(cursor, cursor);
              }}
              onKeyDown={(event) => {
                const cursor = handleChange(myValue).cursor;
                event.currentTarget.setSelectionRange(cursor, cursor);
              }}
              placeholder={placeholder}
              onKeyPress={validateInt}
            />
          </>
        );
      }}
    </CustomField>
  );
};

FormInputPhone.defaultProps = {
  measure: 'md',
  type: 'text',
  disabled: false,
  required: false,
  placeholder: '(123) 456-7890',
  mask: '(___) ___-____',
  hideError: true,
};

FormInputPhone.displayName = 'FormInputPhone';
