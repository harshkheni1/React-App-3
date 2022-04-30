import { FC } from 'react';
import { HtmlProps, WithStyle } from '../../utils';
import { ColorType, CombineHelper, SpacingProps } from '../../const';

export interface AccordionProps extends HtmlProps<HTMLLinkElement>, SpacingProps {}

export interface AccordionItemProps {
  title?: string;
}
