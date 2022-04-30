import { styled } from '../../../utils';
import { PaginationItemProps } from '../types';

export const PaginationItemStyled = styled('li')<PaginationItemProps>`
  height: 52px;
  min-width: 52px;
  display: inline-block;
  line-height: 52px;
  text-align: center;
`;
