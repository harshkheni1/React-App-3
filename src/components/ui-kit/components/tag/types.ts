import { FontWeightType, SpacingProps } from '../../const';
import { TagVariantType, TagSizeType } from './const';
import { HtmlProps } from '../../utils/types';

export type TagPositionType = number | 'auto';
export interface TagProps extends HtmlProps<HTMLSpanElement>, SpacingProps {
  color?: TagVariantType;
  measure?: TagSizeType;
  uppercase?: boolean;
  fullWidth?: boolean;
  fontWeight?: FontWeightType;
  nowrap?: boolean;
  position?: TagPositionType[];
}
