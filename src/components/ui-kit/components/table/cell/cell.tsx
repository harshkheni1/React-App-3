import React, { FC, useContext } from 'react';
import { WithStyle } from '../../../utils';
import { TableCellProps } from '../types';
import { TableCellStyled } from './cell.styled';
import { TableContext } from '../table-context';

export const TableCell: FC<TableCellProps> & WithStyle = ({ type, children, ...rest }) => {
  const contextProps = useContext(TableContext);

  return (
    <TableCellStyled $type={type} {...rest} variant={contextProps.variant}>
      {children}
    </TableCellStyled>
  );
};

TableCell.defaultProps = {
  type: 'basic',
};
