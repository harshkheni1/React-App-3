import { HeadingProps, HeadingSizeScale } from './types';
import { ArrayToType } from '../../const';

export const HeadingSize: HeadingSizeScale = {
  display1: '60px',
  h1: '48px',
  h2: '36px',
  h3: '34px',
  h4: '30px',
  h5: '22px',
  h6: '18px',
};

export const HeadingSizeArray = ['display1', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type HeadingSizeType = ArrayToType<typeof HeadingSizeArray>;

export const HeadingTagArray = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type HeadingTagType = ArrayToType<typeof HeadingTagArray>;

export const HeadingDefault: HeadingProps = {
  measure: 'h1',
  as: 'h1',
  children: 'Demo Text',
};
