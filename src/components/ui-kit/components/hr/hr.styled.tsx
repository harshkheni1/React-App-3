import { styled } from '../../utils';
import { Colors, spacingStyle } from '../../const';
import { HrStyledAttrProps } from './types';

export const HrStyled = styled('hr')<HrStyledAttrProps>`
  border: 0;
  background: ${({ $color }) => Colors[$color]};
  height: 1px;
  display: block;
  ${(props) => spacingStyle(props)}
`;
