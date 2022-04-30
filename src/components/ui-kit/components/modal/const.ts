import { ArrayToType } from '../../const';
import { ModalProps } from './types';

export const ModalSizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
export type ModalSizesType = ArrayToType<typeof ModalSizes>;

export const ModalDefault: ModalProps = {
  measure: 'md',
  isOpen: false,
};
