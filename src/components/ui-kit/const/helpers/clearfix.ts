import { css } from '../../utils';

export const clearfixHelperStyle = css`
  &:after {
    height: 0;
    display: table;
    content: '';
    clear: both;
  }
`;

export interface ClearfixHelper {
  clearfix?: boolean;
}
