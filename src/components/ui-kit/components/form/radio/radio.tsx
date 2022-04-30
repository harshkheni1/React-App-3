import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { FormRadioProps } from './types';
import { FormRadioHidden } from './hidden';

export const FormRadio: FC<FormRadioProps> & WithStyle = (props) => {
  return <FormRadioHidden {...props} />;
};

FormRadio.displayName = 'FormRadio';
