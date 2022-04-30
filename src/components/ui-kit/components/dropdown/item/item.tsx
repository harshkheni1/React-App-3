import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { DropdownItemProps } from '../types';
import { DropdownItemStyled } from './item.styled';

export const DropdownItem: FC<DropdownItemProps> & WithStyle = (props) => {
  const { children } = props;
  return <DropdownItemStyled>{children}</DropdownItemStyled>;
};
