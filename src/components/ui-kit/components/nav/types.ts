import { FC } from 'react';
import { WithStyle, HtmlProps } from '../../utils';
import { ElementPositionType, ArrayToType, SpacingProps, DisplayHelper } from '../../const';

export const NavVariantArray = ['basic', 'tabs', 'outlined'];
export type NavVariantType = ArrayToType<typeof NavVariantArray>;

export interface NavProps extends HtmlProps<HTMLUListElement> {
  position?: ElementPositionType;
  variant?: NavVariantType;
}

export interface NavItemProps extends HtmlProps<HTMLLIElement>, SpacingProps, DisplayHelper {
  active?: boolean;
  variant?: NavVariantType;
}

export const NavLinkArray = ['action'] as const;
export type NavLinkType = ArrayToType<typeof NavLinkArray>;

export interface NavLinkProps extends HtmlProps<HTMLLinkElement> {
  variant?: NavLinkType;
  as?: any;
}

export interface NavStaticProps {
  Item?: FC<NavItemProps> & WithStyle;
  Link?: FC<NavLinkProps> & WithStyle;
}

export interface NavVariantEnum {
  basic: { [k: string]: unknown };
  tabs: { [k: string]: unknown };
  outlined: { [k: string]: unknown };
}
