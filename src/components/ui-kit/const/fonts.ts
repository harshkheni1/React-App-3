import { ArrayToType, FontWeightScale } from './types';

export const FontFamilyValue: { [key in FontFamilyType]: string } = {
  primary: 'Work Sans',
  secondary: 'Open Sans',
};

export const FontFamilyArray = ['primary', 'secondary'] as const;
export type FontFamilyType = ArrayToType<typeof FontFamilyArray>;

export const FontWeightValue: FontWeightScale = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  sbold: 600,
  bold: 700,
  xbold: 800,
  black: 900,
};

export const FontWeightArray = ['thin', 'light', 'normal', 'medium', 'sbold', 'bold', 'xbold', 'black'] as const;
export type FontWeightType = ArrayToType<typeof FontWeightArray>;
