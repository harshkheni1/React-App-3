import { styled } from '../../../utils';
import { Colors } from '../../../const';
import { PaginationLinkProps } from '../types';

export const PaginationLinkStyled = styled('button')<PaginationLinkProps>`
  height: 50px;
  min-width: 50px;
  display: block;
  line-height: 30px;
  padding: 10px;
  box-sizing: border-box;
  margin: 0;
  background-color: ${Colors.white};
  font-size: 14px;
  cursor: pointer;
  color: ${({ active }) => (active ? Colors.primary : Colors.gray800)};
  border: 1px solid ${({ bordered }) => (bordered ? Colors.gray700 : 'transparent')};
  * {
    fill: ${({ active }) => (active ? Colors.primary : Colors.gray800)};
  }
  &:hover {
    color: ${Colors.primary};
    border: 1px solid ${({ bordered }) => (bordered ? Colors.primary : 'transparent')};
    * {
      fill: ${Colors.primary};
    }
  }
  &:disabled {
    cursor: default;
    color: ${Colors.gray300};
    background-color: ${({ bordered }) => (bordered ? Colors.gray100 : 'transparent')};
    border: 1px solid ${({ bordered }) => (bordered ? Colors.gray300 : 'transparent')};
    * {
      fill: ${Colors.gray300};
    }
  }
`;
