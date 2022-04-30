import { ArrayToType } from '../../const';

export const ModalVerticalArray = ['flex-start', 'center', 'flex-end'] as const;
export type ModalVerticalType = ArrayToType<typeof ModalVerticalArray>;
