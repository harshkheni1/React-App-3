import { ColorType, SpacingProps } from '../../const';

export interface HrProps extends SpacingProps {
  color?: ColorType;
}

export interface HrStyledAttrProps extends HrProps {
  $color?: ColorType;
}
