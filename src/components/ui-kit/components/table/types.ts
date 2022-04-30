import { FC } from 'react';
import { WithStyle, HtmlProps } from '../../utils';
import { SpacingProps, AlignHelper, DisplayHelper } from '../../const';
import { TableVariantType, TableCellTypeType, TableCellNameType } from './const';

export interface TableProps extends HtmlProps<HTMLTableElement>, SpacingProps {
  children?: any;
  variant?: TableVariantType;
}

export type TableRowProps = HtmlProps<HTMLTableRowElement>;

export interface TableCellProps extends HtmlProps<HTMLTableCellElement>, SpacingProps, AlignHelper, DisplayHelper {
  name?: TableCellNameType;
  type?: TableCellTypeType;
  variant?: TableVariantType;
}

export interface TableCellStyledAttrProps extends TableCellProps {
  $type?: TableCellTypeType;
}

export interface TableEmptyProps {
  img: string;
  text: string;
}

export interface TableStaticProps {
  Row?: FC<TableRowProps> & WithStyle;
  Cell?: FC<TableCellProps> & WithStyle;
  Empty?: FC<TableEmptyProps>;
}
