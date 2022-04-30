import { ArrayToType } from '../../const';

export const ImgFitArray = ['none', 'contain', 'cover'] as const;
export type ImgFitType = ArrayToType<typeof ImgFitArray>;
