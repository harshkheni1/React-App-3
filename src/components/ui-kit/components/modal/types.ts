import { FC } from 'react';
import { HtmlProps, WithStyle } from '../../utils';
import { FullWidthHelper, SpacingProps } from '../../const';
import { ModalSizesType } from './const';
import { ModalDialogProps } from './modal-dialog/types';

export interface ModalProps extends HtmlProps<HTMLDivElement>, SpacingProps {
  /** Shows modal only when this prop is true */
  isOpen?: boolean;
  /** Function to be called on closing modal */
  onClose?: () => void;
  measure?: ModalSizesType;
  afterOpenModal?: () => void;
}

export interface ModalStaticProps {
  Dialog?: FC<ModalDialogProps> & WithStyle;
  Header?: FC;
  Body?: FC<SpacingProps & FullWidthHelper>;
  Footer?: FC<SpacingProps & FullWidthHelper>;
}

export type ModalBackgroundProps = SpacingProps;
