import { FC } from 'react';
import { HtmlProps, WithStyle } from '../../utils';

export type PopoverElementProps = HtmlProps<HTMLDivElement>;

export interface PopoverProps extends PopoverElementProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export interface PopoverStaticProps {
  Wrap?: FC<PopoverElementProps>;
  Header?: FC<PopoverElementProps> & WithStyle;
  Title?: FC<PopoverElementProps> & WithStyle;
  Body?: FC<PopoverElementProps> & WithStyle;
}
