import React, { FC } from 'react';
import { Range } from 'rc-slider';
import { FormRangeStyled } from './range.styled';
import { FormRangeProps } from './types';

export const FormRange: FC<FormRangeProps> = (props) => {
  // eslint-disable-next-line
  // @ts-ignore
  const range = <Range {...props} />;
  return <FormRangeStyled>{range}</FormRangeStyled>;
};
