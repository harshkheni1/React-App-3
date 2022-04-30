import { FC } from 'react';
import { HtmlProps, WithStyle } from '../../../utils';
import { SpacingProps } from '../../../const';
import { ListGroupCheckedSizeArrayType } from './const';

export interface ListGroupCheckedProps extends HtmlProps<HTMLUListElement>, SpacingProps {
  measure?: ListGroupCheckedSizeArrayType;
}

export interface ListGroupCheckedItemProps extends HtmlProps<HTMLLIElement> {
  active?: boolean;
  url?: string;
  title?: string;
  status?: string;
}

export interface ListGroupCheckedStaticProps {
  Item: FC<ListGroupCheckedItemProps> & WithStyle;
}

export interface ListGroupCheckedSizeStylesType {
  height: number;
  fontSize: number;
  lineHeight: number;
  paddingLeft: number;
  minHeight: number;
  iconLeft: number;
  iconTop: number;
  iconFontSize: number;
}
