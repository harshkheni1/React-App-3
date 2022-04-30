import { GridBreakpointsArrayType, map } from '../grid';
import { css } from '../../utils';

const fullWidthStyles = css`
  width: 100% !important;
  max-width: 100% !important;
`;

export const fullWidthHelperStyle = (fullWidth: boolean | { [key in GridBreakpointsArrayType]?: boolean }) =>
  map(fullWidth, (fullWidth) => (fullWidth ? fullWidthStyles : ''));

export interface FullWidthHelper {
  fullWidth?: boolean | { [key in GridBreakpointsArrayType]?: boolean };
}
