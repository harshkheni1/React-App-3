type stnb = string | number;
export type ArrayToType<T extends readonly stnb[]> = T[number];

export interface GridBreakpointsScale {
  xs?: number | string;
  sm: number | string;
  md: number | string;
  lg: number | string;
  xl: number | string;
}

export interface TextTagScale {
  p: string;
  div: string;
  span: string;
  b?: string;
  strong?: string;
  em?: string;
  i?: string;
}

export interface FontWeightScale {
  thin: number;
  light: number;
  normal: number;
  medium: number;
  sbold: number;
  bold: number;
  xbold: number;
  black: number;
}

export interface Color {
  transparent?: string;
  red?: string;
  black?: string;
  white?: string;
  primaryLight?: string;
  primary?: string;
  primaryDark?: string;
  danger?: string;
  success?: string;
  secondary?: string;
  secondaryLight?: string;
  gray100?: string;
  gray200?: string;
  gray300?: string;
  gray500?: string;
  gray700?: string;
  gray800?: string;
  focus?: string;
}
