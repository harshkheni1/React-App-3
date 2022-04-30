import { ColorType } from '../../const';

export interface ProgressProps {
  percentage?: number;
  color?: ColorType;
  bg?: ColorType;
}

export interface ProgressStyledAttrProps extends ProgressProps {
  $color?: ColorType;
}
