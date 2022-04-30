import { styled, InjectClassName } from '../../utils';
import { IconStyledAttrProps } from './types';
import { Colors, displayHelperStyle, spacingStyle } from '../../const';

export const IconStyled = styled(InjectClassName)<IconStyledAttrProps>`
  ${({ $measure }) => $measure && `font-size: ${$measure}px`};
  ${({ $measure }) => $measure && `height: ${$measure}px`};
  * {
    fill: ${({ $color }) => Colors[$color]};
  }
  ${(props) => spacingStyle(props)}
  ${({ display }) => display && displayHelperStyle(display)}
`;

IconStyled.displayName = 'SvgIcon';
