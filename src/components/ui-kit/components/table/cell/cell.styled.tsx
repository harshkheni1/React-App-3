import { styled, css } from '../../../utils';
import { Colors, spacingStyle, alignHelperStyle, displayHelperStyle } from '../../../const';
import { TableCellStyles } from '../const';
import { TableCellStyledAttrProps } from '../types';

const TableCellHeadStyled = css`
  font-size: 11px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${Colors.gray800};
  background-color: ${Colors.gray200};
  white-space: nowrap;
  padding: 15px;
  letter-spacing: 1.65px;
`;
const TableCellBasicStyled = css`
  font-size: 14px;
  line-height: 20px;
  padding: 10px 15px;
  color: ${Colors.gray800};
`;

export const TableCellStyled = styled('div')<TableCellStyledAttrProps>`
  width: ${({ name }) => (name ? `${TableCellStyles[name].width}px` : 'auto')};
  display: table-cell;
  vertical-align: middle;
  text-transform: ${({ $type }) => ($type === 'head' ? 'uppercase' : 'none')};
  ${(props) => spacingStyle(props)}
  ${({ align }) => (align ? alignHelperStyle(align) : '')}
  ${({ $type }) => ($type === 'head' ? TableCellHeadStyled : TableCellBasicStyled)}
  ${({ display }) => display && displayHelperStyle(display)}
`;
