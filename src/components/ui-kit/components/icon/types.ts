import { ColorType, DisplayHelper, SpacingProps } from '../../const/';
import { IconArrayType } from './const';
import { HtmlProps } from '../../utils';

export type SVGProp = HtmlProps<HTMLOrSVGElement>;

export interface IconProps extends SVGProp, SpacingProps, DisplayHelper {
  /** Icon Size */
  measure?: number;
  /** Icon color */
  color?: ColorType;
  name: IconArrayType;
}

export interface IconStyledAttrProps extends IconProps {
  $measure?: number;
  $color?: ColorType;
}
