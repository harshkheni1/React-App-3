import { ArrayToType } from '../../const';
import { LoadingProps } from './types';

export const LoadingBgArray = ['secondaryLight', 'white'];
export type LoadingBgType = ArrayToType<typeof LoadingBgArray>;

export const LoadingBg: { [key in LoadingBgType]: string } = {
  secondaryLight: 'rgba(250, 244, 239, 0.6)',
  white: 'rgba(255, 255, 255, 0.6)',
};
export const LoadingDefault: LoadingProps = {
  color: 'gray800',
  fontSize: 32,
  text: 'Loading...',
  full: true,
  bg: 'secondaryLight',
};
