import { ArrayToType } from '../../../const';
import { ListGroupCheckedSizeStylesType } from './types';

export const ListGroupCheckedSizeArray = ['sm', 'md'] as const;
export type ListGroupCheckedSizeArrayType = ArrayToType<typeof ListGroupCheckedSizeArray>;

export const ListGroupCheckedSizeStyles: { [key in ListGroupCheckedSizeArrayType]?: ListGroupCheckedSizeStylesType } = {
  sm: {
    height: 38,
    fontSize: 14,
    lineHeight: 24,
    paddingLeft: 54,
    minHeight: 50,
    iconLeft: 43,
    iconTop: 14,
    iconFontSize: 12,
  },
  md: {
    height: 47,
    fontSize: 16,
    lineHeight: 24,
    paddingLeft: 60,
    minHeight: 73,
    iconLeft: 48,
    iconTop: 16,
    iconFontSize: 16,
  },
};
