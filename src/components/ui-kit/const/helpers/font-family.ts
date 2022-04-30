import { css } from '../../utils';
import { FontFamilyType, FontFamilyValue } from '../fonts';

export const fontFamilyHelperStyle = (fontFamily: FontFamilyType) => css`
  font-family: ${FontFamilyValue[fontFamily]} !important;
`;
export interface FontFamilyHelper {
  fontFamily?: FontFamilyType;
}
