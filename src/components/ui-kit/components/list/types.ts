import { FC } from 'react';
import { HtmlProps, WithStyle } from '../../utils';
import { ColorHelper, ColorType, DisplayHelper, SpacingProps, TextSizeType } from '../../const';

export interface ListProps extends HtmlProps<HTMLUListElement>, ColorHelper, SpacingProps {
  inline?: boolean;
  uppercase?: boolean;
  measure?: TextSizeType;
  letterSpacing?: number;
  listStyle?: 'check' | 'none' | 'disc';
  group?: boolean;
}

export interface ListStyledAttrProps extends ListProps {
  $color?: ColorType;
}

export interface ListItemProps extends HtmlProps<HTMLLIElement>, SpacingProps, DisplayHelper {}

export interface ListStaticProps {
  Item: FC<ListItemProps> & WithStyle;
}
