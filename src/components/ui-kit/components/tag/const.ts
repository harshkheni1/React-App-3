import { TagColorType } from '../../const';
import { ArrayToType } from '../../utils';
import { TagProps } from './types';

export interface TagSizeStyleType {
  fontSize: number;
  lineHeight: number;
  paddingVertical: number;
  paddingHorizontal: number;
}

export const TagSizeArray = ['md'] as const;
export type TagSizeType = ArrayToType<typeof TagSizeArray>;
export const TagSize: { [key in TagSizeType]?: TagSizeStyleType } = {
  md: {
    fontSize: 14,
    lineHeight: 22,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },
};

export interface TagVariantStyleType {
  color: TagColorType;
  bg: TagColorType;
}

export const TagVariantArray = ['open', 'close', 'denied', 'review', 'approved', 'draft'] as const;
export type TagVariantType = ArrayToType<typeof TagVariantArray>;
export const TagVariant: { [key in TagVariantType]?: TagVariantStyleType } = {
  open: {
    color: 'openText',
    bg: 'open',
  },
  close: {
    color: 'closedText',
    bg: 'close',
  },
  denied: {
    color: 'deniedText',
    bg: 'denied',
  },
  review: {
    color: 'reviewText',
    bg: 'review',
  },
  approved: {
    color: 'approvedText',
    bg: 'approved',
  },
  draft: {
    color: 'draftText',
    bg: 'draft',
  },
};

export const TagDefault: TagProps = {
  measure: 'md',
  color: 'open',
  uppercase: false,
  fontWeight: 'normal',
};
