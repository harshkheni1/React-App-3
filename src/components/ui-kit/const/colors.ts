import { ArrayToType } from './types';

export const Colors: { [key in ColorType]: string } = {
  transparent: 'transparent',
  white: '#fff',
  black: '#000',
  gray100: '#F9F9F9',
  gray200: '#F6F6F9',
  gray300: '#F1F1F2',
  gray400: '#EAEEF5',
  gray500: '#DBE1EB',
  gray700: '#B5C2D1',
  gray800: '#414042',
  red: '#DF6857',
  redDark: '#C04634',
  yellow: '#FCC659',
  primaryLight: '#4F98D7',
  primary: '#2D6CCA',
  primaryDark: '#0B4EB2',
  secondary: '#4CCFD6',
  secondaryLight: '#93DEE2',
  danger: '#DF6857',
  success: '#5BCDA0',
  focus: '#A4A2FB',
  green: '#28a745',
};

export const ColorArray = [
  'transparent',
  'white',
  'black',
  'gray100',
  'gray200',
  'gray300',
  'gray400',
  'gray500',
  'gray700',
  'gray800',
  'red',
  'redDark',
  'yellow',
  'primaryLight',
  'primary',
  'primaryDark',
  'secondary',
  'secondaryLight',
  'danger',
  'success',
  'focus',
  'green',
] as const;

export type ColorType = ArrayToType<typeof ColorArray>;

export const TagColors: { [key in TagColorType]: string } = {
  open: '#E0EEC2',
  close: '#DCE5FB',
  denied: '#FCDDDD',
  review: '#FBE4B8',
  approved: '#D2F4DB',
  draft: '#EAEAEA',
  openText: '#8BC52C',
  closedText: '#7C9AE7',
  deniedText: '#EF8080',
  reviewText: '#F19845',
  approvedText: '#64C69F',
  draftText: '#B1B1B1',
};

export const TagColorArray = [
  'open',
  'close',
  'denied',
  'review',
  'approved',
  'draft',
  'openText',
  'closedText',
  'deniedText',
  'reviewText',
  'approvedText',
  'draftText',
] as const;

export type TagColorType = ArrayToType<typeof TagColorArray>;
