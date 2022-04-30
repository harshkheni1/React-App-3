import React, { FC } from 'react';
import { PaginationLinkProps } from '../types';
import { PaginationLinkStyled } from './link.styled';

export const PaginationLink: FC<PaginationLinkProps> = ({ children, ...rest }) => {
  return <PaginationLinkStyled {...rest}>{children}</PaginationLinkStyled>;
};
