import React, { FC } from 'react';
import { PaginationItemProps } from '../types';
import { PaginationItemStyled } from './item.styled';

export const PaginationItem: FC<PaginationItemProps> = ({ children }, rest) => {
  return <PaginationItemStyled {...rest}>{children}</PaginationItemStyled>;
};
