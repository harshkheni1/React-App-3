import { FC } from 'react';
import { HtmlProps, WithStyle } from '../../utils';

export type NavbarProps = HtmlProps<HTMLDivElement>;

export interface NavbarBrandProps extends HtmlProps<HTMLLinkElement> {
  text?: string;
  as?: any;
}

export type NavbarBrandTextProps = HtmlProps<HTMLSpanElement>;

export interface NavbarCollapseProps extends HtmlProps<HTMLDivElement> {
  active?: boolean;
}

export interface NavbarDropdownProps extends HtmlProps<HTMLDivElement> {
  isOpen?: boolean;
}

export interface NavbarToggleProps extends Omit<HtmlProps<HTMLButtonElement>, 'type'> {
  active?: boolean;
}

export interface NavbarStaticProps {
  Brand?: FC<NavbarBrandProps> & WithStyle;
  Collapse?: FC<NavbarCollapseProps> & WithStyle;
  Dropdown?: FC<NavbarDropdownProps> & WithStyle;
  Toggle?: FC<NavbarToggleProps> & WithStyle;
}
