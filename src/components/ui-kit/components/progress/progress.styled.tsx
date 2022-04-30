import { styled } from '../../utils';
import { ProgressStyledAttrProps } from './types';
import { Colors, SpacingProps, spacingStyle } from '../../const';

export const ProgressStyled = styled('div')<ProgressStyledAttrProps & SpacingProps>`
  background-color: ${({ bg }) => Colors[bg]};
  overflow: hidden;
  height: 8px;
  border-radius: 4px;

  ${(props) => spacingStyle(props)}

  & > div {
    background-color: ${({ $color }) => Colors[$color]};
    width: ${({ percentage }) => `${percentage}%`};
    height: 8px;
    border-radius: 4px;
    transition: 0.3s;
  }
`;
