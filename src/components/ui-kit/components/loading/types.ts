import { LoadingBgType } from './const';
import { ColorType } from '../../const';

export interface LoadingProps {
  fontSize?: number;
  color?: ColorType;
  text?: string;
  full?: boolean;
  bg?: LoadingBgType;
}

export interface LoadingStyledAttrProps extends LoadingProps {
  $fontSize?: number;
  $color?: ColorType;
}
