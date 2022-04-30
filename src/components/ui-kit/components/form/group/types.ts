import { FieldGroupNavProps, FieldGroupProps } from 'react-uforms';

export interface FormGroupNavProps extends Omit<FieldGroupNavProps, 'as' | 'ref'> {
  ignoreCompleted?: boolean;
}

export interface FormGroupNavStyledAttrProps extends FormGroupNavProps {
  $stepsQty?: number;
  $ignoreCompleted?: boolean;
}

export type FormGroupProps = Omit<FieldGroupProps, 'as' | 'ref'>;
