import { ArrayToType } from './types';

export const TextSizeArray = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'inherit'] as const;
export type TextSizeType = ArrayToType<typeof TextSizeArray>;

export const TextSize: { [key in TextSizeType]?: string } = {
  xxs: '11px',
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  inherit: 'inherit',
};

export const TextTagArray = ['div', 'p', 'span', 'b', 'strong', 'em', 'label', 'a'] as const;
export type TextTagType = ArrayToType<typeof TextTagArray>;
