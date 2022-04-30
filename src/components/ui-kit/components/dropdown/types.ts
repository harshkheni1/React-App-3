import { FC } from 'react';
import { WithStyle, HtmlProps } from '../../utils';
import { SpacingProps } from '../../const';

export type DropdownProps = HtmlProps<HTMLDivElement>;

export interface DropdownMenuProps extends HtmlProps<HTMLUListElement> {
  active?: boolean;
}

export interface DropdownItemProps extends HtmlProps<HTMLLIElement>, SpacingProps {}

export interface DropdownLinkProps extends HtmlProps<HTMLAnchorElement> {
  onClick?: () => void;
}

export interface DropdownStaticProps {
  Menu?: FC<DropdownMenuProps> & WithStyle;
  Item?: FC<DropdownItemProps> & WithStyle;
  Link?: FC<DropdownLinkProps> & WithStyle;
}
