import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { TableProps, TableStaticProps } from './types';
import { TableStyled } from './table.styled';
import { TableRow } from './row';
import { TableCell } from './cell';
import { TableEmpty } from './table-empty';
import { TableContext } from './table-context';

export const Table: FC<TableProps> & TableStaticProps & WithStyle = (props) => {
  const { variant } = props;
  return (
    <TableContext.Provider value={props}>
      <TableStyled {...{ variant }}>{props.children}</TableStyled>
    </TableContext.Provider>
  );
};

Table.defaultProps = {
  variant: 'lines',
};

TableRow.displayName = 'Table.Row';
TableCell.displayName = 'Table.Cell';
TableEmpty.displayName = 'Table.Empty';
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Empty = TableEmpty;
