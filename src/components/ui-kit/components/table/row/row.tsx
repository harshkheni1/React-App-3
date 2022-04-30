import React, { FC } from 'react';
import { WithStyle } from '../../../utils';
import { TableRowProps } from '../types';
import { TableRowStyled } from './row.styled';

export const TableRow: FC<TableRowProps> & WithStyle = (props) => {
  return <TableRowStyled>{props.children}</TableRowStyled>;
};
