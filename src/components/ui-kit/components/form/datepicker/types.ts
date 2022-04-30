import { ReactDatePickerProps } from 'react-datepicker';
import * as React from 'react';
import { SpacingProps } from '../../../const/helpers';

export interface FormDatepickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  id: string;
  label?: string;
  isMobile?: boolean;
  isNative?: boolean;
  mask?: any;
  dateFormat?: string;
  outputDateFormat?: string;
  onChange?(date: null | string, event: React.SyntheticEvent<any> | undefined): void;
}

export interface FormDatepickerFieldProps extends FormDatepickerProps, SpacingProps {
  label?: string;
}
