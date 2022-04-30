import { css } from '../../utils';
import { Colors, ColorType } from '../colors';

export const colorHelperStyle = (color: ColorType) => css`
  color: ${Colors[color]} !important;
`;

export interface ColorHelper {
  color?: ColorType;
}

export interface ColorHelperStyledAttrProps extends ColorHelper {
  $color?: ColorType;
}
